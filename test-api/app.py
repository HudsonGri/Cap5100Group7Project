from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

# Allowed functions and variables in the execution environment
allowed_builtins = {
    "print": print,
    "range": range,
    "len": len,
    "sum": sum,
    "max": max,
    "min": min,
}

@app.post("/execute_code")
async def execute_code(request: CodeRequest):
    # Create a safe, limited execution environment
    safe_globals = {"__builtins__": allowed_builtins}
    safe_locals = {}

    # Capture output
    stdout = io.StringIO()
    sys.stdout = stdout

    try:
        # Execute the code in the safe environment
        exec(request.code, safe_globals, safe_locals)
    except Exception as e:
        # Catch any errors and return a message
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        # Reset stdout
        sys.stdout = sys.__stdout__

    # Extract variables and their values
    variables = {k: v for k, v in safe_locals.items() if not k.startswith("__")}

    # Return the output and variables
    output = stdout.getvalue()
    return {"output": output, "variables": variables}

# Run the application with Uvicorn
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
