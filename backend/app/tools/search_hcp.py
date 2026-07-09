from langchain_core.tools import tool

@tool
def search_hcp(name: str):
    """Search an HCP by name."""

    return {
        "name": name,
        "hospital": "Apollo Hospital",
        "specialization": "Cardiology"
    }