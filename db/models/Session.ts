import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({ role: { type: String, enum: ['user', 'assistant'], required: true }, content: { type: String, required: true }, createdAt: { type: Date, default: Date.now } }, { _id: false });
const SessionSchema = new mongoose.Schema({ userId: { type: String, default: 'demo-user' }, title: { type: String, required: true }, theme: { type: String, required: true }, startMood: { type: Number, required: true }, endMood: Number, messages: [MessageSchema], insights: [String] }, { timestamps: true });
export const SessionModel = mongoose.models.Session ?? mongoose.model('Session', SessionSchema);
