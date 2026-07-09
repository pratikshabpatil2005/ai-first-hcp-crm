from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime

from app.database import Base


# --------------------
# User Model
# --------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True, index=True)

    password = Column(String)

    role = Column(String)



# --------------------
# HCP Model
# --------------------

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    specialization = Column(String)

    hospital = Column(String)

    location = Column(String)

    phone = Column(String)

    email = Column(String)



# --------------------
# Lead Model
# --------------------

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String)

    company = Column(String)

    source = Column(String)

    status = Column(
        String,
        default="New"
    )

    notes = Column(String)



# --------------------
# Appointment Model
# --------------------

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    hcp_name = Column(
        String,
        nullable=False
    )

    hospital = Column(
        String,
        nullable=False
    )

    appointment_date = Column(
        Date,
        nullable=False
    )

    appointment_time = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="Scheduled"
    )

    notes = Column(String)



# --------------------
# Activity Log Model
# --------------------

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    action = Column(
        String,
        nullable=False
    )

    entity = Column(
        String,
        nullable=False
    )

    entity_id = Column(
        Integer,
        nullable=False
    )

    description = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )