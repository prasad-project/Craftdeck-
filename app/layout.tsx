import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevPortfolio — Build. Showcase. Get Hired.',
  description: 'Create a stunning developer portfolio, showcase your skills, and get discovered by top companies and teams.',
  generator: 'v0.app',
  openGraph: { title: 'DevPortfolio — Build. Showcase. Get Hired.', description: 'Your developer portfolio, all in one place.', type: 'website' },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#0b2e6b', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
