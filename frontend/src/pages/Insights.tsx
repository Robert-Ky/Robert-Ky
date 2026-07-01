import { InsightsDashboard } from '../components/InsightsDashboard';
import { JournalExport } from '../components/JournalExport';
import { SessionHistory } from '../components/SessionHistory';
export function Insights() { return <main className="page"><h1>History & insights</h1><div className="grid"><div><InsightsDashboard /><br/><JournalExport /></div><SessionHistory /></div></main>; }
