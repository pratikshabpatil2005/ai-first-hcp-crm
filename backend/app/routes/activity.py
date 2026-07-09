from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ActivityLog

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)


@router.get("/")
def get_activity(db: Session = Depends(get_db)):
    return (
        db.query(ActivityLog)
        .order_by(ActivityLog.created_at.desc())
        .all()
    )