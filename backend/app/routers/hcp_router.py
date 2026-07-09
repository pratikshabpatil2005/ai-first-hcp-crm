from fastapi import APIRouter

router = APIRouter()


@router.get("/hcps")
def get_hcps():

    return [
        {
            "id": 1,
            "name": "Dr. Raj Sharma",
            "specialization": "Cardiology",
            "hospital": "Apollo Hospital",
        },
        {
            "id": 2,
            "name": "Dr. Priya Patel",
            "specialization": "Neurology",
            "hospital": "Fortis Hospital",
        },
    ]