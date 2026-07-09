from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def ask_ai(prompt: str):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an AI assistant for a Healthcare CRM. Help users manage doctors, hospitals, leads, meetings, emails, and CRM tasks."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5,
        max_tokens=1024,
    )

    return response.choices[0].message.content