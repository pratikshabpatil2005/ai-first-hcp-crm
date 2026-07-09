

from pydantic import BaseModel, EmailStr


# --------------------
# User Schemas
# --------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class LoginUser(BaseModel):
    email: EmailStr
    password: str



# --------------------
# HCP Schemas
# --------------------

class HCPCreate(BaseModel):
    name: str
    specialization: str
    hospital: str
    location: str
    phone: str
    email: EmailStr



# --------------------
# Lead Schemas
# --------------------

class LeadCreate(BaseModel):
    hcp_name: str
    company: str
    source: str
    status: str
    notes: str



# --------------------
# Appointment Schemas
# --------------------

class AppointmentCreate(BaseModel):
    hcp_name: str
    date: str
    time: str
    purpose: str
    status: str



# --------------------
# Task Schemas
# --------------------

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str
    priority: str

# --------------------
# AI Schemas
# --------------------

class AIRequest(BaseModel):
    prompt: str

# --------------------
# Response Config
# --------------------

class Config:
    from_attributes = True

# --------------------
# Appointment Schemas
# --------------------

class AppointmentCreate(BaseModel):
    hcp_name: str
    hospital: str
    appointment_date: str
    appointment_time: str
    status: str
    notes: str


class AppointmentUpdate(BaseModel):
    hcp_name: str
    hospital: str
    appointment_date: str
    appointment_time: str
    status: str
    notes: str