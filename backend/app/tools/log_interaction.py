from langchain_core.tools import tool


@tool
def log_interaction(message: str):
    """
    Extract interaction details from a sales representative's notes.
    """

    return {
        "hcp_name": "Dr. Sharma",
        "product": "CardioPlus",
        "summary": message,
        "interest": "High",
        "follow_up": "Next Monday",
    }