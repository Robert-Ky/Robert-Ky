import { Router } from 'express';
import { z } from 'zod';
import { containsSelfHarm, reflect } from '../services/claudeService.js';
import { appendMessages, getSession } from '../services/sessionService.js';

export const conversationsRouter = Router();
conversationsRouter.post('/', async (req, res, next) => { try {
  const { sessionId, content } = z.object({ sessionId: z.string(), content: z.string().min(1) }).parse(req.body);
  const session = await getSession(sessionId); if (!session) return res.status(404).send('Session not found');
  const user = { role: 'user', content, createdAt: new Date() };
  const safetyNotice = containsSelfHarm(content) ? 'If you might hurt yourself, please contact emergency services or the 988 Suicide & Crisis Lifeline in the U.S. and Canada now.' : undefined;
  const assistant = { role: 'assistant', content: safetyNotice ? `${safetyNotice}\n\nWhat is one immediate step that would help you be less alone with this right now?` : await reflect(session.theme, [...session.messages, user]), createdAt: new Date() };
  await appendMessages(sessionId, user, assistant);
  res.json({ user, assistant, safetyNotice });
} catch (error) { next(error); } });
