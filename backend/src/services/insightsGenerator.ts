export function generateInsights(sessions: any[]) {
  const themes = [...new Set(sessions.flatMap((s) => [s.theme, ...(s.insights ?? [])]))].slice(0, 8);
  const timeline = sessions.map((s) => ({ date: s.createdAt, mood: s.endMood ?? s.startMood, theme: s.theme })).reverse();
  const summary = sessions.length ? `Across ${sessions.length} sessions, recurring attention is gathering around ${themes.slice(0, 3).join(', ')}.` : 'No sessions yet.';
  return { themes, timeline, summary };
}
