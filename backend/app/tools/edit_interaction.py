from langchain_core.tools import tool

@tool
def edit_interaction(interaction_id: int, new_notes: str):
    """Edit an existing interaction."""

    return {
        "status": "updated",
        "interaction_id": interaction_id,
        "notes": new_notes
    }