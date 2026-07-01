import { useState } from 'react';
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Insights } from './pages/Insights';
import './styles.css';

type Page = 'home' | 'chat' | 'insights';
export default function App() {
  const [page, setPage] = useState<Page>('home');
  return <div className="app"><nav className="nav"><strong>🪞 Consciousness Mirror</strong><a href="#" onClick={() => setPage('home')}>Home</a><a href="#" onClick={() => setPage('chat')}>Chat</a><a href="#" onClick={() => setPage('insights')}>Insights</a></nav>{page === 'home' ? <Home /> : page === 'chat' ? <Chat /> : <Insights />}</div>;
}
