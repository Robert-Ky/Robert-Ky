import { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';

type Insights = Awaited<ReturnType<typeof apiClient.generateInsights>>;
export function InsightsDashboard() {
  const [insights, setInsights] = useState<Insights>();
  useEffect(() => { apiClient.generateInsights().then(setInsights).catch(() => undefined); }, []);
  return <div className="card"><h2>Insights dashboard</h2><p>{insights?.summary ?? 'Complete sessions to reveal patterns over time.'}</p><div className="timeline">{insights?.timeline.map((point) => <div key={point.date} title={`${point.theme}: ${point.mood}/10`} className="bar" style={{ height: `${point.mood * 10}%` }} />)}</div><h3>Recurring themes</h3><ul>{insights?.themes.map((theme) => <li key={theme}>{theme}</li>)}</ul></div>;
}
