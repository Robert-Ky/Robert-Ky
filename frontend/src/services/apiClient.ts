export type Role = 'user' | 'assistant';
export type ChatMessage = { role: Role; content: string; createdAt?: string };
export type ReflectionTheme = 'values' | 'emotions' | 'decisions' | 'purpose' | 'blind-spots';
export type Session = { _id: string; theme: ReflectionTheme; title: string; startMood: number; endMood?: number; messages: ChatMessage[]; insights?: string[]; createdAt: string };

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...init?.headers }, ...init });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export const apiClient = {
  startSession: (theme: ReflectionTheme, startMood: number) => request<Session>('/api/sessions', { method: 'POST', body: JSON.stringify({ theme, startMood }) }),
  sendMessage: (sessionId: string, content: string) => request<{ user: ChatMessage; assistant: ChatMessage; safetyNotice?: string }>(`/api/conversations`, { method: 'POST', body: JSON.stringify({ sessionId, content }) }),
  getSession: (id: string) => request<Session>(`/api/sessions/${id}`),
  listSessions: () => request<Session[]>('/api/sessions'),
  updateMood: (id: string, endMood: number) => request<Session>(`/api/sessions/${id}/mood`, { method: 'PATCH', body: JSON.stringify({ endMood }) }),
  generateInsights: () => request<{ themes: string[]; timeline: { date: string; mood: number; theme: ReflectionTheme }[]; summary: string }>('/api/insights'),
};
