import { useEffect, useState } from 'react';
import { apiClient, Session } from '../services/apiClient';

function toMarkdown(sessions: Session[]) {
  return sessions.map((session) => `# ${session.title}\n\nTheme: ${session.theme}\nMood: ${session.startMood} → ${session.endMood ?? 'open'}\n\n${session.messages.map((m) => `**${m.role}:** ${m.content}`).join('\n\n')}`).join('\n\n---\n\n');
}
export function JournalExport() {
  const [markdown, setMarkdown] = useState('');
  useEffect(() => { apiClient.listSessions().then((sessions) => setMarkdown(toMarkdown(sessions))).catch(() => undefined); }, []);
  const download = () => { const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' })); const a = document.createElement('a'); a.href = url; a.download = 'consciousness-mirror-journal.md'; a.click(); URL.revokeObjectURL(url); };
  return <div className="card"><h2>Journal export</h2><textarea rows={12} value={markdown} onChange={(e) => setMarkdown(e.target.value)} /><p><button onClick={download}>Download Markdown</button></p></div>;
}
