'use client'

import { useMemo, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import Link from 'next/link'
import { Bookmark, Menu, Search, X } from 'lucide-react'
import {
  categories,
  featuredStory,
  popularLists,
  sideStories,
  stories,
  topics,
  videos,
} from './tech-hub-data'
import { FeaturedStories, PopularLists, StoryCard, VideoCard } from './tech-hub-sections'

type SortMode = 'Latest' | 'Popular' | 'Most Liked'

const allStories = [featuredStory, ...sideStories, ...stories]

function HubNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Developers', href: '/#developers' },
    { label: 'Arena', href: '/arena' },
    { label: 'Tech Hub', href: '/tech-hub' },
    { label: 'Pricing', href: '/#pricing' },
  ]

  return (
    <header className="hub-nav">
      <div className="hub-nav-inner">
        <Link className="hub-logo" href="/" aria-label="DevPortfolio home">
          <span className="hub-logo-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>DevPortfolio</span>
        </Link>
        <nav className="hub-nav-links" aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} aria-current={link.label === 'Tech Hub' ? 'page' : undefined} className={link.label === 'Tech Hub' ? 'is-current' : undefined}>{link.label}</Link>)}
        </nav>
        <span className="hub-profile-avatar" role="img" aria-label="DevPortfolio member profile"><span className="hub-avatar-hair"/><span className="hub-avatar-face"/><span className="hub-avatar-body"/></span>
        <button className="hub-mobile-toggle" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && <nav className="hub-mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}</nav>}
    </header>
  )
}

function HubMasthead({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  savedCount,
  savedOnly,
  onToggleSaved,
}: {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  savedCount: number
  savedOnly: boolean
  onToggleSaved: () => void
}) {
  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault()
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => event.preventDefault()

  return (
    <section className="hub-masthead">
      <div className="hub-container">
        <div className="hub-search-row">
          <form className="hub-search-form" role="search" onSubmit={submitSearch}>
            <Search size={20} aria-hidden="true" />
            <label className="sr-only" htmlFor="hub-search">Search news, topics, tools, companies and tutorials</label>
            <input id="hub-search" type="search" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} onKeyDown={onSearchKeyDown} placeholder="Search news, topics, tools, companies and tutorials" />
            <button className="hub-search-submit" type="submit">Search</button>
          </form>
          <button type="button" className={`hub-saved-button ${savedOnly ? 'is-active' : ''}`} aria-pressed={savedOnly} onClick={onToggleSaved}><Bookmark size={16} /> Saved ({savedCount})</button>
        </div>
        <div className="hub-category-scroll" role="group" aria-label="Technology categories">
          {categories.map((category) => <button key={category} type="button" aria-pressed={selectedCategory === category} className={`hub-category-tab ${selectedCategory === category ? 'is-active' : ''}`} onClick={() => onCategoryChange(category)}>{category}</button>)}
        </div>
      </div>
    </section>
  )
}

function LatestNews({
  stories: visibleStories,
  allCount,
  sortMode,
  onSortChange,
  likedIds,
  savedIds,
  onLike,
  onSave,
  onShare,
  onLoadMore,
  hasMore,
  savedOnly,
}: {
  stories: typeof stories
  allCount: number
  sortMode: SortMode
  onSortChange: (sort: SortMode) => void
  likedIds: Set<string>
  savedIds: Set<string>
  onLike: (id: string) => void
  onSave: (id: string) => void
  onShare: (id: string) => void
  onLoadMore: () => void
  hasMore: boolean
  savedOnly: boolean
}) {
  return (
    <section className="hub-section" aria-labelledby="hub-latest-title" id="latest-news">
      <div className="hub-container">
        <div className="hub-latest-heading">
          <h2 className="hub-section-title" id="hub-latest-title">Latest Technology News</h2>
          <div className="hub-sort-controls"><span>Sort by</span><div className="hub-sort-segment" role="group" aria-label="Sort stories">{(['Latest', 'Popular', 'Most Liked'] as SortMode[]).map((sort) => <button key={sort} type="button" aria-pressed={sortMode === sort} className={sortMode === sort ? 'is-active' : ''} onClick={() => onSortChange(sort)}>{sort}</button>)}</div></div>
        </div>
        {visibleStories.length > 0 ? <div className="hub-story-grid">{visibleStories.map((story) => <StoryCard key={story.id} story={story} liked={likedIds.has(story.id)} saved={savedIds.has(story.id)} onLike={() => onLike(story.id)} onSave={() => onSave(story.id)} onShare={() => onShare(story.id)} />)}</div> : <div className="hub-empty-state"><strong>{savedOnly ? 'No saved stories match this view.' : 'No stories found.'}</strong><span>Try another topic or search term.</span></div>}
        {allCount > 0 && <div className="hub-load-more-wrap">{hasMore && <button type="button" className="hub-load-more" onClick={onLoadMore}>Load more stories</button>}<p>Showing {visibleStories.length} of {allCount} stories{hasMore ? ' · or load more' : ''}</p></div>}
      </div>
    </section>
  )
}

function TrendingTopics({ activeTopic, onTopicChange }: { activeTopic: string | null; onTopicChange: (topic: string) => void }) {
  return (
    <section className="hub-section hub-cream-section" aria-labelledby="hub-topics-title">
      <div className="hub-container">
        <h2 className="hub-section-title" id="hub-topics-title">Trending Topics</h2>
        <p className="hub-section-subtitle">Tap a topic to filter the feed above.</p>
        <div className="hub-topics">{topics.map((topic, index) => {
          const active = activeTopic === topic || (activeTopic === null && index === 0)
          return <button key={topic} type="button" className={`hub-topic ${active ? 'is-active' : ''}`} aria-pressed={activeTopic === topic} onClick={() => onTopicChange(topic)}>#{topic}</button>
        })}</div>
      </div>
    </section>
  )
}

function VideosSection() {
  return (
    <section className="hub-section hub-cream-section" aria-labelledby="hub-videos-title">
      <div className="hub-container">
        <h2 className="hub-section-title" id="hub-videos-title">Tech Vlogs &amp; Videos</h2>
        <p className="hub-section-subtitle">Videos from external creators. Each one links to its original source. They are not made by DevPortfolio.</p>
        <div className="hub-video-grid">{videos.map((video) => <VideoCard key={video.id} video={video} />)}</div>
      </div>
    </section>
  )
}

function HubFooter() {
  return <footer className="hub-footer"><div className="hub-container"><span>Content is curated and published by the DevPortfolio editorial team. Original publishers keep all rights to their articles and videos.</span><span>© 2026 DevPortfolio</span></div></footer>
}

export default function TechHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('For You')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('Latest')
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedIds, setSavedIds] = useState(() => new Set(['package-manager']))
  const [likedIds, setLikedIds] = useState(() => new Set<string>())
  const [savedCount, setSavedCount] = useState(12)
  const [visibleCount, setVisibleCount] = useState(6)
  const [shareMessage, setShareMessage] = useState('')

  const filteredStories = useMemo(() => {
    const queryTokens = searchQuery.trim().toLowerCase().split(/\\s+/).filter(Boolean)
    const filtered = stories.filter((story) => {
      const matchesCategory = selectedCategory === 'For You' || selectedCategory === 'Latest News' || story.category === selectedCategory
      const storyWords = [story.title, story.category, story.summary, story.source, ...story.topics].join(' ').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
      const matchesQuery = queryTokens.length === 0 || queryTokens.every((token) => storyWords.includes(token))
      const matchesTopic = !activeTopic || story.topics.includes(activeTopic)
      const matchesSaved = !savedOnly || savedIds.has(story.id)
      return matchesCategory && matchesQuery && matchesTopic && matchesSaved
    })

    return filtered.sort((a, b) => {
      if (sortMode === 'Popular') return Number.parseFloat(b.reads) - Number.parseFloat(a.reads)
      if (sortMode === 'Most Liked') return b.likes - a.likes
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [activeTopic, savedIds, savedOnly, searchQuery, selectedCategory, sortMode])

  const visibleStories = filteredStories.slice(0, visibleCount)
  const storyLookup = new Map(allStories.map((story) => [story.id, story]))

  const toggleLike = (id: string) => setLikedIds((current) => {
    const next = new Set(current)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  const toggleSave = (id: string) => {
    const removing = savedIds.has(id)
    setSavedIds((current) => {
      const next = new Set(current)
      if (removing) next.delete(id)
      else next.add(id)
      return next
    })
    setSavedCount((count) => Math.max(0, count + (removing ? -1 : 1)))
  }

  const shareStory = (id: string) => {
    const story = storyLookup.get(id)
    if (!story || typeof window === 'undefined') return
    const url = `${window.location.origin}/tech-hub#story-${id}`
    const shareData = { title: story.title, url }
    if (navigator.share) {
      void navigator.share(shareData).catch(() => undefined)
      return
    }
    if (navigator.clipboard) void navigator.clipboard.writeText(url).then(() => setShareMessage(`Link copied for ${story.title}`)).catch(() => setShareMessage('Could not copy the story link.'))
  }

  const changeCategory = (category: string) => {
    setSelectedCategory(category)
    setVisibleCount(6)
    setSavedOnly(false)
  }

  const changeTopic = (topic: string) => {
    setActiveTopic((current) => current === topic ? null : topic)
    setVisibleCount(6)
    document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="hub-page" id="top">
      <HubNavigation />
      <HubMasthead selectedCategory={selectedCategory} onCategoryChange={changeCategory} searchQuery={searchQuery} onSearchChange={(value) => { setSearchQuery(value); setVisibleCount(6) }} savedCount={savedCount} savedOnly={savedOnly} onToggleSaved={() => { setSavedOnly((current) => !current); setSelectedCategory('For You'); setActiveTopic(null); setVisibleCount(6) }} />
      <FeaturedStories featuredStory={featuredStory} sideStories={sideStories} likedIds={likedIds} savedIds={savedIds} onLike={toggleLike} onSave={toggleSave} onShare={shareStory} />
      <LatestNews stories={visibleStories} allCount={filteredStories.length} sortMode={sortMode} onSortChange={setSortMode} likedIds={likedIds} savedIds={savedIds} onLike={toggleLike} onSave={toggleSave} onShare={shareStory} onLoadMore={() => setVisibleCount((count) => count + 6)} hasMore={visibleCount < filteredStories.length} savedOnly={savedOnly} />
      <VideosSection />
      <TrendingTopics activeTopic={activeTopic} onTopicChange={changeTopic} />
      <PopularLists lists={popularLists} stories={allStories} />
      <HubFooter />
      <div className="hub-share-status" role="status" aria-live="polite">{shareMessage}</div>
    </main>
  )
}
