"""
Módulo de integração com APIs de IA para resumo de texto.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Carrega .env da pasta resumidor ou da pasta raiz do projeto
load_dotenv()
load_dotenv(Path(__file__).resolve().parent.parent / ".env")


def resumir_com_gemini(texto: str, estilo: str = "paragrafos") -> str:
    """
    Envia o texto para o Gemini e retorna o resumo.
    estilo: "paragrafos" | "bullet" | "executivo"
    """
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        "gemini-1.5-flash",
        system_instruction=(
            "Você é um editor sênior. Produza resumos fiéis ao texto-fonte. "
            "Não invente fatos, nomes, números ou conclusões. "
            "Não escreva preâmbulo nem fechamento. Responda só com o resumo."
        ),
        generation_config={"temperature": 0.3, "max_output_tokens": 1024},
    )

    prompts = {
        "paragrafos": "Formato: até 3 parágrafos curtos, linguagem clara e objetiva, tom editorial.",
        "bullet": "Formato: no máximo 5 tópicos iniciados por •. Uma ideia por linha.",
        "executivo": "Formato: resumo executivo em 2 ou 3 frases, focado em decisão rápida.",
    }
    prompt = prompts.get(estilo, prompts["paragrafos"]) + "\n\nTEXTO:\n"

    response = model.generate_content(prompt + texto)
    return response.text
