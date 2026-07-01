import type { ReflectionTheme } from '../services/apiClient';

const prompts: Record<ReflectionTheme, string[]> = {
  values: ['What felt most meaningful to you this week?', 'Where did your actions align—or conflict—with your values?'],
  emotions: ['Which emotion has been asking for your attention?', 'What tends to trigger or soften that feeling?'],
  decisions: ['What decision are you circling around?', 'What assumptions are shaping your options?'],
  purpose: ['What gives you a sense of aliveness?', 'What would you protect even if it were inconvenient?'],
  'blind-spots': ['What feedback do you resist?', 'What story might you be telling yourself too confidently?'],
};

export function ReflectionPrompt({ theme, onPick }: { theme: ReflectionTheme; onPick: (prompt: string) => void }) {
  return <div className="card"><h3>Reflection starters</h3>{prompts[theme].map((prompt) => <p key={prompt}><button className="secondary" onClick={() => onPick(prompt)}>{prompt}</button></p>)}</div>;
}
