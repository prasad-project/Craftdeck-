import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Coding Arena — DevPortfolio', description: 'Challenge your coding knowledge and compete with developers.' }
export default function ArenaLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
