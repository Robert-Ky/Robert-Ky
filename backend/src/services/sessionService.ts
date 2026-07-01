import { SessionModel } from '../db/models/Session.js';

const memorySessions: any[] = [];
export async function connectDatabase(uri?: string) { if (uri) { const mongoose = await import('mongoose'); await mongoose.connect(uri); } }
export async function createSession(theme: string, startMood: number) {
  const data = { _id: crypto.randomUUID(), title: `${theme} reflection`, theme, startMood, messages: [{ role: 'assistant', content: `Welcome. Let's explore ${theme} gently. What would feel useful to understand about yourself today?`, createdAt: new Date() }], insights: [], createdAt: new Date() };
  if (process.env.MONGODB_URI) return SessionModel.create(data);
  memorySessions.unshift(data); return data;
}
export async function listSessions() { return process.env.MONGODB_URI ? SessionModel.find().sort({ createdAt: -1 }).lean() : memorySessions; }
export async function getSession(id: string) { return process.env.MONGODB_URI ? SessionModel.findById(id) : memorySessions.find((s) => s._id === id); }
export async function appendMessages(id: string, user: any, assistant: any) { const session = await getSession(id); if (!session) throw new Error('Session not found'); session.messages.push(user, assistant); if (session.save) await session.save(); return session; }
export async function updateEndMood(id: string, endMood: number) { const session = await getSession(id); if (!session) throw new Error('Session not found'); session.endMood = endMood; if (session.save) await session.save(); return session; }
