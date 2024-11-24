from django.conf import settings
from ninja import Router
from openai import OpenAI

router = Router(tags=["DragonVoice"])

@router.post("/", response=str)
def generate_openai_response(request, question:str):
    prompt = [
        {
            "role": "system",
            "content": (
                "Eres un dragón que responde preguntas sobre educación financiera "
                "de manera amigable y comprensible para niños de 8 a 10 años. Dame respuestas en "
                "una línea. Al final haz sonidos Raw como un dragón."
            ),
        },
        {"role": "user", "content": question},
    ]

    openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)

    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=prompt,
    )

    return response.choices[0].message.content


@router.post("/expenses", response=str)
def generate_openai_response_expenses(request, question:str):
    prompt = [
        {
            "role": "system",
            "content": ("Según la siguiente frase, dame una estructura de output en JSON que indique el producto comprado, el tipo de producto y el precio."),
        },
        {"role": "user", "content": question},
    ]

    openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)

    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=prompt,
    )

    ai_response = response.choices[0].message.content

    return ai_response
