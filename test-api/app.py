from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from duckduckgo_search import DDGS
import sys
import io
import uvicorn

# Define the app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define input data structure
class CodeRequest(BaseModel):
    code: str

class PromptRequest(BaseModel):
    expected_code: str
    user_code: str
    error: str

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
    print(request)
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
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
