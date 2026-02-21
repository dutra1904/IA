"""
Resumidor de artigos com interface web (Streamlit).
Execute: streamlit run app.py
"""
import streamlit as st
from api import resumir_com_gemini

st.set_page_config(
    page_title="Resumidor de Artigos",
    page_icon="📝",
    layout="centered",
)

st.title("📝 Resumidor de Artigos")
st.markdown("Cole um texto e a IA gerará um resumo para você.")
st.divider()

estilo = st.radio(
    "Estilo do resumo",
    options=["paragrafos", "bullet", "executivo"],
    format_func=lambda x: {
        "paragrafos": "Parágrafos (até 3)",
        "bullet": "Bullet points (até 5 itens)",
        "executivo": "Resumo executivo (2-3 frases)",
    }[x],
    horizontal=True,
)

texto = st.text_area(
    "Texto para resumir",
    placeholder="Cole aqui o artigo, notícia ou qualquer texto que deseja resumir...",
    height=200,
)

col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    botao = st.button("Gerar resumo", type="primary", use_container_width=True)

if botao and texto.strip():
    with st.spinner("Gerando resumo..."):
        resumo = resumir_com_gemini(texto.strip(), estilo=estilo)

    st.success("Resumo gerado!")
    st.markdown("---")
    st.subheader("Resumo")
    st.write(resumo)

elif botao and not texto.strip():
    st.warning("Digite ou cole um texto para resumir.")
