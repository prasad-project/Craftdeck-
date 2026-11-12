import type { Metadata } from 'next'
import TechHubPage from '@/components/tech-hub/tech-hub-page'
import './tech-hub.css'

export const metadata: Metadata = {
  title: 'Tech Hub | DevPortfolio',
  description: 'Your daily source for technology, innovation, developer tools, and practical guides.',
  openGraph: {
    title: 'Tech Hub | DevPortfolio',
    description: 'Technology, innovation, and knowledge for developers.',
    type: 'website',
  },
}

export default function Page() {
  return <TechHubPage />
}
