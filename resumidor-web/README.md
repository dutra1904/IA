# Resumidor IA (web)

Interface Next.js para resumir textos com o Google Gemini. Pronta para o Vercel. A visão geral do repositório, incluindo o CLI em Python, está no [README da raiz](../README.md).

## O que a interface faz

- Formatos: parágrafos, tópicos ou resumo executivo
- Português e inglês, com a escolha salva no navegador
- Limite de 40 a 12.000 caracteres
- Cópia do resumo e comparação de tamanho com o texto original
- Atalho `Ctrl + Enter` e cancelamento da geração em andamento

## Desenvolvimento local

Na raiz do repositório, copie `.env.example` para `.env` e preencha `GEMINI_API_KEY`. A aplicação também aceita `resumidor-web/.env.local`.

```bash
cd resumidor-web
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

`GEMINI_MODEL` é opcional. Sem ela, a rota usa o primeiro modelo da conta que aceite `generateContent`.

## API

`POST /api/resumir`

```json
{ "texto": "...", "estilo": "paragrafos", "idioma": "pt" }
```

`estilo` aceita `paragrafos`, `bullet` ou `executivo`. `idioma` aceita `pt` ou `en`. A resposta é `{ "resumo": "..." }`.

`GET /api/modelos` devolve a lista de modelos disponíveis para a chave.

## Deploy no Vercel

1. Faça push do código para o GitHub.
2. No [Vercel](https://vercel.com), importe o repositório e defina a pasta raiz como `resumidor-web`.
3. Adicione a variável de ambiente `GEMINI_API_KEY`.
4. Faça o deploy. O Vercel detecta Next.js automaticamente.

Pela CLI:

```bash
npm i -g vercel
vercel
```
