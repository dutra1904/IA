"""
CLI do resumidor. Uso: python resumir.py
"""
from api import resumir_com_gemini


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

    texto = "\n".join(linhas[:-2]).strip()
    if not texto:
        print("Nenhum texto informado.")
        raise SystemExit(1)

    print("\n--- Gerando resumo... ---\n")
    resumo = resumir_com_gemini(texto, estilo="paragrafos")
    print("RESUMO:\n")
    print(resumo)
