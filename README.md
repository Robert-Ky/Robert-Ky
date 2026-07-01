# Consciousness Mirror

Consciousness Mirror is a full-stack reflection application that guides users through structured, non-judgmental conversations using Claude. It supports themed reflection flows, session history, mood tracking, insight summaries, and Markdown journal export.

## Stack

- React 18 + TypeScript frontend powered by Vite
- Tailwind-inspired CSS and polished card/button/input UI patterns
- Node.js + Express backend
- Anthropic Claude API integration with a local fallback when no API key is configured
- Optional MongoDB persistence, with in-memory storage for local demos
- JWT demo authentication endpoint

## Quick start

```bash
npm install
cp .env.example backend/.env
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000

## Environment

```bash
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-6
MONGODB_URI=mongodb://localhost:27017/consciousness-mirror
JWT_SECRET=replace-me
FRONTEND_ORIGIN=http://localhost:5173
```

## Reflection flows

The app includes flows for values, emotions, decisions, purpose, and blind spots. The system prompt asks Claude to deepen reflection progressively while avoiding judgment, diagnosis, and toxic positivity.

## Safety

The backend detects common self-harm phrasing and returns a supportive crisis-resource response instead of continuing normal reflection.
