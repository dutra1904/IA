# Resumidor IA

Interface web para resumir textos usando Google Gemini. Pronto para deploy no Vercel.

## Desenvolvimento local

```bash
cd resumidor-web

# Instalar dependências
npm install

# Configurar variável de ambiente (use a mesma chave do .env da pasta raiz)
# Crie .env.local com: GEMINI_API_KEY=sua_chave

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Deploy no Vercel

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com) e conecte o repositório
3. Na configuração do projeto, adicione a variável de ambiente:
   - **Nome:** `GEMINI_API_KEY`
   - **Valor:** sua chave da API Gemini
4. Deploy! O Vercel detecta Next.js automaticamente

### Via CLI

```bash
npm i -g vercel
vercel
# Siga as instruções e adicione GEMINI_API_KEY no dashboard
```
