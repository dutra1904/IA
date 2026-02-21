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
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompts = {
        "paragrafos": """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.""",
        "bullet": """Resuma o seguinte texto em bullet points (lista com •), com no máximo 5 tópicos.
Seja conciso e destaque apenas o essencial.""",
        "executivo": """Gere um resumo executivo (2-3 frases) do texto abaixo.
Foque nos pontos mais importantes para decisão rápida.""",
    }
    prompt = prompts.get(estilo, prompts["paragrafos"])
    prompt += "\n\nTEXTO:\n"

    response = model.generate_content(prompt + texto)
    return response.text
