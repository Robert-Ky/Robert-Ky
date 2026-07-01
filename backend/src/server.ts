import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { conversationsRouter } from './routes/conversations.js';
import { insightsRouter } from './routes/insights.js';
import { sessionsRouter } from './routes/sessions.js';
import { connectDatabase } from './services/sessionService.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? true }));
app.use(express.json({ limit: '1mb' }));
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/insights', insightsRouter);
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' }));

const port = Number(process.env.PORT ?? 4000);
connectDatabase(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`Consciousness Mirror API listening on ${port}`)));
