from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Lead
from app.schemas import LeadCreate


router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


# Get all leads
@router.get("/")
def get_leads(
    db: Session = Depends(get_db)
):
    return db.query(Lead).all()



# Get lead by id
@router.get("/{lead_id}")
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()


    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )


    return lead



# Create lead
@router.post("/")
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):

    new_lead = Lead(

        hcp_name=lead.hcp_name,

        company=lead.company,

        source=lead.source,

        status=lead.status,

        notes=lead.notes
    )


    db.add(new_lead)

    db.commit()

    db.refresh(new_lead)


    return new_lead




# Update lead
@router.put("/{lead_id}")
def update_lead(
    lead_id: int,
    lead: LeadCreate,
    db: Session = Depends(get_db)
):

    db_lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()


    if not db_lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )


    db_lead.hcp_name = lead.hcp_name

    db_lead.company = lead.company

    db_lead.source = lead.source

    db_lead.status = lead.status

    db_lead.notes = lead.notes



    db.commit()

    db.refresh(db_lead)


    return db_lead




# Delete lead
@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()


    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )


    db.delete(lead)

    db.commit()


    return {
        "message": "Lead deleted successfully"
    }