import { Router } from 'express';
import { generateInsights } from '../services/insightsGenerator.js';
import { listSessions } from '../services/sessionService.js';
export const insightsRouter = Router();
insightsRouter.get('/', async (_req, res, next) => { try { res.json(generateInsights(await listSessions())); } catch (error) { next(error); } });
