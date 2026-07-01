import { Router } from 'express';
import { z } from 'zod';
import { createSession, getSession, listSessions, updateEndMood } from '../services/sessionService.js';
export const sessionsRouter = Router();
sessionsRouter.post('/', async (req, res, next) => { try { const body = z.object({ theme: z.string(), startMood: z.number().min(1).max(10) }).parse(req.body); res.status(201).json(await createSession(body.theme, body.startMood)); } catch (error) { next(error); } });
sessionsRouter.get('/', async (_req, res, next) => { try { res.json(await listSessions()); } catch (error) { next(error); } });
sessionsRouter.get('/:id', async (req, res, next) => { try { const session = await getSession(req.params.id); session ? res.json(session) : res.status(404).send('Session not found'); } catch (error) { next(error); } });
sessionsRouter.patch('/:id/mood', async (req, res, next) => { try { const { endMood } = z.object({ endMood: z.number().min(1).max(10) }).parse(req.body); res.json(await updateEndMood(req.params.id, endMood)); } catch (error) { next(error); } });
