const systemPrompt = `You are Consciousness Mirror: a careful self-reflection companion. Use non-judgmental Socratic questions, avoid diagnosis and toxic positivity, progressively move from surface observations to emotions, assumptions, values, and actionable insight. If self-harm appears, respond with empathy and encourage immediate local emergency or crisis support.`;
const themeLens: Record<string, string> = { values: 'personal values and integrity', emotions: 'emotional patterns, triggers, and needs', decisions: 'decision frameworks, tradeoffs, and assumptions', purpose: 'life goals, purpose, and meaning', 'blind-spots': 'cognitive biases, avoided feedback, and blind spots' };
export function containsSelfHarm(text: string) { return /\b(kill myself|suicide|self-harm|hurt myself|end my life)\b/i.test(text); }
export async function reflect(theme: string, messages: { role: 'user' | 'assistant'; content: string }[]) {
  if (!process.env.ANTHROPIC_API_KEY) return `I hear you. Looking through the lens of ${themeLens[theme] ?? theme}, what feeling or assumption seems most important to examine next, and what evidence might gently challenge it?`;
  const response = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6', max_tokens: 700, system: `${systemPrompt}\nCurrent theme: ${themeLens[theme] ?? theme}.`, messages }) });
  if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
  const data = await response.json() as { content?: { type: string; text: string }[] };
  return data.content?.filter((block) => block.type === 'text').map((block) => block.text).join('\n') || 'What feels most important to notice right now?';
}
