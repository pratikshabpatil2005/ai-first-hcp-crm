from langchain_core.tools import tool

@tool
def followup(hcp: str):
    """Recommend a follow-up action for an HCP."""

    return {
        "hcp": hcp,
        "recommendation": "Schedule follow-up in 2 weeks."
    }