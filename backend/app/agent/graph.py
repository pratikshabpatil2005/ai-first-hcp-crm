from langgraph.prebuilt import create_react_agent

from app.agent.llm import llm

from app.tools.log_interaction import log_interaction
from app.tools.edit_interaction import edit_interaction
from app.tools.search_hcp import search_hcp
from app.tools.product_info import product_info
from app.tools.followup import followup

tools = [
    log_interaction,
    edit_interaction,
    search_hcp,
    product_info,
    followup,
]

agent = create_react_agent(
    model=llm,
    tools=tools,
)