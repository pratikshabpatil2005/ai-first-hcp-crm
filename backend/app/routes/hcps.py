from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import HCP
from app.schemas import HCPCreate

router = APIRouter(
    prefix="/hcps",
    tags=["HCPs"]
)


# Get all HCPs
@router.get("/")
def get_hcps(db: Session = Depends(get_db)):
    return db.query(HCP).all()


# Get HCP by ID
@router.get("/{hcp_id}")
def get_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    return hcp


# Create HCP
@router.post("/")
def create_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    new_hcp = HCP(
        name=hcp.name,
        specialization=hcp.specialization,
        hospital=hcp.hospital,
        location=hcp.location,
        phone=hcp.phone,
        email=hcp.email
    )

    db.add(new_hcp)
    db.commit()
    db.refresh(new_hcp)

    return new_hcp


# Update HCP
@router.put("/{hcp_id}")
def update_hcp(
    hcp_id: int,
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    db_hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not db_hcp:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    db_hcp.name = hcp.name
    db_hcp.specialization = hcp.specialization
    db_hcp.hospital = hcp.hospital
    db_hcp.location = hcp.location
    db_hcp.phone = hcp.phone
    db_hcp.email = hcp.email

    db.commit()
    db.refresh(db_hcp)

    return db_hcp


# Delete HCP
@router.delete("/{hcp_id}")
def delete_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        raise HTTPException(
            status_code=404,
            detail="HCP not found"
        )

    db.delete(hcp)
    db.commit()

    return {
        "message": "HCP deleted successfully"
    }