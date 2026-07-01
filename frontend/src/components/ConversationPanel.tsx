import { useEffect, useState } from 'react';
import { apiClient, ChatMessage, ReflectionTheme, Session } from '../services/apiClient';
import { ReflectionPrompt } from './ReflectionPrompt';

export function ConversationPanel() {
  const [theme, setTheme] = useState<ReflectionTheme>('values');
  const [mood, setMood] = useState(5);
  const [session, setSession] = useState<Session>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => { void start(); }, []);
  async function start(nextTheme = theme) {
    const created = await apiClient.startSession(nextTheme, mood);
    setSession(created); setMessages(created.messages); setNotice('');
  }
  async function send(text = input) {
    if (!session || !text.trim()) return;
    setBusy(true); setInput(''); setNotice('');
    try {
      const response = await apiClient.sendMessage(session._id, text.trim());
      setMessages((current) => [...current, response.user, response.assistant]);
      if (response.safetyNotice) setNotice(response.safetyNotice);
    } finally { setBusy(false); }
  }

  return <div className="grid"><section className="card"><div className="messages">{messages.map((message, index) => <div key={index} className={`bubble ${message.role}`}>{message.content}</div>)}</div>{notice && <p className="warning">{notice}</p>}<form className="composer" onSubmit={(event) => { event.preventDefault(); void send(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Share what you are noticing..." /><button disabled={busy}>{busy ? 'Reflecting…' : 'Send'}</button></form></section><aside><div className="card"><h3>Session setup</h3><label>Theme <select value={theme} onChange={(event) => { const next = event.target.value as ReflectionTheme; setTheme(next); void start(next); }}><option value="values">Values</option><option value="emotions">Emotions</option><option value="decisions">Decisions</option><option value="purpose">Purpose</option><option value="blind-spots">Blind spots</option></select></label><p>Mood: {mood}/10</p><input type="range" min="1" max="10" value={mood} onChange={(event) => setMood(Number(event.target.value))} /></div><ReflectionPrompt theme={theme} onPick={(prompt) => void send(prompt)} /></aside></div>;
}
