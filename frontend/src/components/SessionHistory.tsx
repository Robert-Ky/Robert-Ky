import { useEffect, useState } from 'react';
import { apiClient, Session } from '../services/apiClient';

export function SessionHistory() {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => { apiClient.listSessions().then(setSessions).catch(() => setSessions([])); }, []);
  return <div className="card"><h2>Session history</h2>{sessions.map((session) => <article key={session._id}><strong>{session.title}</strong><p className="muted">{new Date(session.createdAt).toLocaleString()} · {session.theme} · mood {session.endMood ?? session.startMood}/10</p></article>)}</div>;
}
