import Link from 'next/link'

export default function DailyPage() {
  return <main className="arena-page" style={{ padding: '80px 24px', textAlign: 'center' }}><h1>Daily Challenge</h1><p>Challenge mode is coming soon.</p><Link className="orange-button" href="/arena">Back to Arena</Link></main>
}
