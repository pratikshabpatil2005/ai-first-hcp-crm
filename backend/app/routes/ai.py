from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas import AIRequest

from app.services.ai_service import ask_ai

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class AIRequest(BaseModel):
    prompt: str


@router.post("/chat")
def chat(request: AIRequest):
    reply = ask_ai(request.prompt)

    return {
        "response": reply
    }

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Lead

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


@router.post("/lead-summary/{lead_id}")
def lead_summary(
    lead_id: int,
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if lead is None:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    prompt = f"""
You are an expert Healthcare CRM assistant.

Lead Information:
HCP Name: {lead.hcp_name}
Company: {lead.company}
Source: {lead.source}
Status: {lead.status}
Notes: {lead.notes}

Tasks:
1. Summarize the lead.
2. Suggest the next action.
3. Estimate the chance of conversion.
4. Write a short follow-up message.
"""

    ai_response = ask_ai(prompt)

    return {
        "lead_id": lead.id,
        "ai_summary": ai_response
    }