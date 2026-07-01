import { Router } from 'express';
import jwt from 'jsonwebtoken';
export const authRouter = Router();
authRouter.post('/demo', (_req, res) => { res.json({ token: jwt.sign({ sub: 'demo-user' }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '7d' }) }); });
