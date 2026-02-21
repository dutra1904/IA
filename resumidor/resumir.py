"""
Resumidor de artigos usando Gemini (Google AI).
Uso: python resumir.py
"""
from api import resumir_com_gemini
load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text


load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text


load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text


load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text


load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text


load_dotenv()
def resumir_com_gemini(texto: str) -> str:
    """Envia o texto para o Gemini e retorna o resumo."""
    try:
        import google.generativeai as genai
    except ImportError:
        return "Erro: instale com 'pip install google-generativeai python-dotenv'"

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Erro: defina GEMINI_API_KEY no arquivo .env"

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """Resuma o seguinte texto em até 3 parágrafos, mantendo os pontos principais.
Use linguagem clara e objetiva.

TEXTO:
"""
    response = model.generate_content(prompt + texto)
    return response.text




if __name__ == "__main__":
    print("=== Resumidor de Artigos (Gemini) ===\n")
    print("Cole o texto para resumir (duas linhas em branco para finalizar):\n")

    linhas = []
    vazias = 0
    while vazias < 2:
        linha = input()
        if linha.strip() == "":
            vazias += 1
        else:
            vazias = 0
        linhas.append(linha)

    texto = "\n".join(linhas[:-2]).strip()  # Remove as 2 linhas vazias finais
    if not texto:
        print("Nenhum texto informado.")
        exit(1)

    print("\n--- Gerando resumo... ---\n")
    resumo = resumir_com_gemini(texto, estilo="paragrafos")
    print("RESUMO:\n")
    print(resumo)
