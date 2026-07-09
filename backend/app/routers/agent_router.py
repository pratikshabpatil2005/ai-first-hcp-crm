from fastapi import APIRouter
from pydantic import BaseModel

from app.agent.graph import agent

router = APIRouter(prefix="/agent", tags=["Agent"])


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):

    result = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": request.message,
                }
            ]
        }
    )

    return {
        "response": result["messages"][-1].content
    }