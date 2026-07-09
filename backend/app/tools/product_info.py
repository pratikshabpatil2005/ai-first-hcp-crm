from langchain_core.tools import tool

@tool
def product_info(product: str):
    """Retrieve product information."""

    return {
        "product": product,
        "indication": "Hypertension",
        "dose": "Once Daily"
    }