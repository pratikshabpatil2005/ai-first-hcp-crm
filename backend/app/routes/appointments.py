from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Appointment
from app.schemas import AppointmentCreate, AppointmentUpdate


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)


@router.get("/")
def get_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()


@router.post("/")
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db)
):
    new_appointment = Appointment(
        hcp_name=appointment.hcp_name,
        hospital=appointment.hospital,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
        notes=appointment.notes,
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return new_appointment


@router.put("/{appointment_id}")
def update_status(
    appointment_id: int,
    data: AppointmentUpdate,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment.status = data.status
    db.commit()
    db.refresh(appointment)

    return appointment


@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")

    db.delete(appointment)
    db.commit()

    return {"message": "Appointment deleted"}