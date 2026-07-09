

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import User, HCP, Lead, Appointment

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):

    total_users = db.query(User).count()
    total_hcps = db.query(HCP).count()
    total_leads = db.query(Lead).count()
    total_appointments = db.query(Appointment).count()

    lead_status = (
        db.query(
            Lead.status,
            func.count(Lead.id)
        )
        .group_by(Lead.status)
        .all()
    )

    appointment_status = (
        db.query(
            Appointment.status,
            func.count(Appointment.id)
        )
        .group_by(Appointment.status)
        .all()
    )

    return {
        "cards": {
            "users": total_users,
            "hcps": total_hcps,
            "leads": total_leads,
            "appointments": total_appointments
        },
        "lead_status": [
            {
                "status": status,
                "count": count
            }
            for status, count in lead_status
        ],
        "appointment_status": [
            {
                "status": status,
                "count": count
            }
            for status, count in appointment_status
        ]
    }

