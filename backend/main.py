import io
import json
import sqlite3
import sys
from datetime import datetime, timezone, timedelta

import uvicorn
from duckduckgo_search import DDGS
from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from pydantic import BaseModel

# Define the app
app = FastAPI()

# Adjust CORS settings since we're not using cookies
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # We're not using cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_PATH = "./users.db"

# JWT setup
SECRET_KEY = "somesecretkey"  # Replace with your own secret key
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=60))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Dependency to get current user ID from the token in the Authorization header
async def get_current_user_id(request: Request):
    token = None

    # Get the token from the Authorization header
    authorization: str = request.headers.get("Authorization")
    if authorization:
        scheme, _, param = authorization.partition(" ")
        if scheme.lower() == "bearer":
            token = param

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )


# Define input data structures

class CodeRequest(BaseModel):
    code: str


class PromptRequest(BaseModel):
    expected_code: str
    user_code: str
    error: str


class LoginRequest(BaseModel):
    user_id: int


# Merge function
def merge_dicts(original: dict, new_data: dict) -> dict:
    """
    Merge new_data into original dict recursively.
    New data has higher precedence.
    """
    for key, value in new_data.items():
        if (
                key in original
                and isinstance(original[key], dict)
                and isinstance(value, dict)
        ):
            merge_dicts(original[key], value)
        elif (
                key in original
                and isinstance(original[key], list)
                and isinstance(value, list)
                and len(value) > 0
        ):
            original[key].extend(value)
        else:
            original[key] = value
    return original


# Initialize the database
def init_db():
    # Use TEXT for simplicity since we are not querying the data
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT DEFAULT '{}'
        )
    ''')
    conn.commit()
    conn.close()


init_db()


# Endpoints
@app.post("/assign_id")
async def assign_id():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (data) VALUES ('{}')")
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()
    access_token = create_access_token(data={"user_id": user_id})
    return {"user_id": user_id, "access_token": access_token, "token_type": "bearer"}


@app.post("/login")
async def login(request: LoginRequest):
    user_id = request.user_id
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Allow login only if user doesn't exist, and create new user
    cursor.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    if user:
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        cursor.execute("INSERT INTO users (user_id, data) VALUES (?, '{}')", (user_id,))
        conn.commit()
        access_token = create_access_token(data={"user_id": user_id})
        conn.close()
        return {"access_token": access_token, "token_type": "bearer"}

    # Uncomment the following code to allow login only if user exists
    # cursor.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,))
    # user = cursor.fetchone()
    # if not user:
    #     conn.close()
    #     raise HTTPException(status_code=404, detail="User not found")
    # access_token = create_access_token(data={"user_id": user_id})
    # conn.close()
    # return {"access_token": access_token, "token_type": "bearer"}


@app.post("/log_data")
async def log_data(new_data: dict, user_id: int = Depends(get_current_user_id)):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT data FROM users WHERE user_id = ?", (user_id,))
    result = cursor.fetchone()
    if not result:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    existing_data = result[0]
    if existing_data:
        existing_data = json.loads(existing_data)
    else:
        existing_data = {}
    # Merge the new data with existing data
    updated_data = merge_dicts(existing_data, new_data)
    cursor.execute("UPDATE users SET data = ? WHERE user_id = ?", (json.dumps(updated_data), user_id))
    conn.commit()
    conn.close()
    return {"message": "Data updated successfully", "data": updated_data}


# Allowed functions and variables in the execution environment
allowed_builtins = {
    "print": print,
    "range": range,
    "len": len,
    "sum": sum,
    "max": max,
    "min": min,
    "int": int,
}


@app.post("/execute_code")
async def execute_code(request: CodeRequest):
    # Create a safe, limited execution environment
    safe_globals = {"__builtins__": allowed_builtins}
    safe_locals = {}

    # Capture output
    stdout = io.StringIO()
    sys.stdout = stdout
    error = False

    try:
        # Execute the code in the safe environment
        exec(request.code, safe_globals, safe_locals)
    except Exception as e:
        # Catch any errors and return a message
        error = True
        return {"output": str(e), "error": True}
    finally:
        # Reset stdout
        sys.stdout = sys.__stdout__

    # Extract variables and their values
    variables = {k: v for k, v in safe_locals.items() if not k.startswith("__")}

    # Return the output and variables
    output = stdout.getvalue()
    return {"output": output, "variables": variables, "error": error}


@app.post("/llm")
async def llm(request: PromptRequest):
    try:
        system_prompt = f"""
        Provide feedback on a user's Python code by comparing it to the expected input and pointing out errors in a friendly manner.

        Make sure the response explains where the code diverges from the expected, provides clear hints on what went wrong.

        # Steps

        - Compare the user's code to the expected Python code.
        - Determine the differences and deduce the primary reason behind the error message provided.
        - Craft an explanation stating what went wrong and why it happened.
        - Include a helpful hint on what to change to fix the issue.
        - Keep your response concise with only 3 sentences maximum.
        - Do not use emojis.

        # Output Format

        The output should be a friendly paragraph that:
        - Clearly states the error and the issue in the user's code.
        - Provides a specific hint to guide the user toward fixing the error.

        Expected Code:
        ```python
        {request.expected_code}
        ```

        User Code:
        ```python
        {request.user_code}
        ```

        Error Message:
        {request.error}
        """
        results = DDGS().chat(system_prompt, model='gpt-4o-mini')
        return {"response": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run the application with Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
