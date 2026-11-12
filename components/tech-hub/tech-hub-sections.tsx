'use client'

import { useState } from 'react'
import { Bookmark, Heart, MessageCircle, Play, Share2 } from 'lucide-react'
import type { ArtworkKind, Story, Video } from './tech-hub-data'

const categoryTone: Record<string, string> = {
  'Artificial Intelligence': 'orange',
  'Data Science & ML': 'purple',
  Programming: 'blue',
  'Startups & Business': 'orange',
  'Developer Tools': 'green',
  'Tech Vlogs': 'green',
  'Tutorials & Guides': 'purple',
  Cybersecurity: 'red',
}

export function StoryArtwork({ kind, label }: { kind: ArtworkKind; label: string }) {
  return (
    <div className={`hub-art hub-art-${kind}`} role="img" aria-label={label}>
      <span className="hub-art-shape hub-art-shape-one" />
      <span className="hub-art-shape hub-art-shape-two" />
    </div>
  )
}

function CategoryBadge({ category }: { category: string }) {
  return <span className={`hub-chip hub-chip-${categoryTone[category] ?? 'blue'}`}>{category}</span>
}

function StoryActions({
  story,
  liked,
  saved,
  onLike,
  onSave,
  onShare,
}: {
  story: Story
  liked: boolean
  saved: boolean
  onLike: () => void
  onSave: () => void
  onShare: () => void
}) {
  return (
    <div className="hub-story-actions">
      <div className="hub-action-group">
        <button className={`hub-action ${liked ? 'is-active' : ''}`} type="button" aria-label={`${liked ? 'Unlike' : 'Like'} ${story.title}`} aria-pressed={liked} onClick={onLike}>
          <Heart size={15} /> {story.likes + (liked ? 1 : 0)}
        </button>
        <span className="hub-action" aria-label={`${story.comments} comments`}><MessageCircle size={15} /> {story.comments}</span>
      </div>
      <div className="hub-action-group">
        <button className={`hub-action hub-icon-action ${saved ? 'is-active' : ''}`} type="button" aria-label={`${saved ? 'Remove from' : 'Save to'} reading list: ${story.title}`} aria-pressed={saved} onClick={onSave}><Bookmark size={15} /></button>
        <button className="hub-action hub-icon-action" type="button" aria-label={`Share ${story.title}`} onClick={onShare}><Share2 size={15} /></button>
      </div>
    </div>
  )
}

export function StoryCard({
  story,
  variant = 'standard',
  liked,
  saved,
  onLike,
  onSave,
  onShare,
}: {
  story: Story
  variant?: 'standard' | 'compact' | 'feature'
  liked: boolean
  saved: boolean
  onLike: () => void
  onSave: () => void
  onShare: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className={`hub-story-card hub-story-card-${variant}`} id={`story-${story.id}`}>
      <StoryArtwork kind={story.art} label={`Abstract illustration for ${story.category}`} />
      <div className="hub-story-content">
        <div className="hub-story-meta-line">
          <CategoryBadge category={story.category} />
          {variant === 'standard' && <span className="hub-read-time">{story.readTime} min read</span>}
        </div>
        <h3>{story.title}</h3>
        {variant !== 'compact' && <p className="hub-story-summary">{story.summary}</p>}
        <div className="hub-byline"><span>{story.source} ↗</span><span>· {story.dateLabel}</span></div>
        {variant === 'feature' && <button className="hub-read-more" type="button" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}>{expanded ? 'Read Less' : 'Read More'} <span aria-hidden="true">→</span></button>}
        {variant === 'feature' && expanded && <p className="hub-feature-expanded">The report compares code completion, response quality and repository-level context, showing how community-built models are improving on everyday development work.</p>}
        <StoryActions story={story} liked={liked} saved={saved} onLike={onLike} onSave={onSave} onShare={onShare} />
      </div>
    </article>
  )
}

export function FeaturedStories({
  featuredStory,
  sideStories,
  likedIds,
  savedIds,
  onLike,
  onSave,
  onShare,
}: {
  featuredStory: Story
  sideStories: Story[]
  likedIds: Set<string>
  savedIds: Set<string>
  onLike: (id: string) => void
  onSave: (id: string) => void
  onShare: (id: string) => void
}) {
  return (
    <section className="hub-section hub-featured-section" aria-labelledby="hub-featured-title">
      <div className="hub-container">
        <h2 className="hub-section-title" id="hub-featured-title">Featured Technology Stories</h2>
        <div className="hub-featured-grid">
          <StoryCard story={featuredStory} variant="feature" liked={likedIds.has(featuredStory.id)} saved={savedIds.has(featuredStory.id)} onLike={() => onLike(featuredStory.id)} onSave={() => onSave(featuredStory.id)} onShare={() => onShare(featuredStory.id)} />
          <div className="hub-featured-side">
            {sideStories.map((story) => <StoryCard key={story.id} story={story} variant="compact" liked={likedIds.has(story.id)} saved={savedIds.has(story.id)} onLike={() => onLike(story.id)} onSave={() => onSave(story.id)} onShare={() => onShare(story.id)} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="hub-video-card">
      <div className="hub-video-art-wrap">
        <StoryArtwork kind={video.art} label={`Video thumbnail illustration for ${video.title}`} />
        <span className="hub-play-button" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
        <span className="hub-video-duration">{video.duration}</span>
      </div>
      <div className="hub-video-content">
        <h3>{video.title}</h3>
        <p>{video.summary}</p>
        <div className="hub-video-byline"><strong>{video.creator}</strong><span>· {video.date}</span></div>
        <span className="hub-original-link">Watch on the original site ↗</span>
        <div className="hub-video-actions"><span><Heart size={15} /> {video.likes}</span><span><MessageCircle size={15} /> {video.comments}</span></div>
      </div>
    </article>
  )
}

export function PopularLists({ lists, stories }: { lists: { title: string; metric: string; storyIds: string[] }[]; stories: Story[] }) {
  const lookup = new Map(stories.map((story) => [story.id, story]))
  const extraTitles: Record<string, string> = {
    'ai-agent-video': 'Build an AI agent in 20 minutes',
    'linux-video': 'Ten Linux terminal tricks',
  }
  const extraMetrics: Record<string, Record<string, string>> = {
    'ai-agent-video': { likes: '210 likes', comments: '34 comments' },
    'linux-video': { likes: '142 likes', comments: '21 comments' },
  }

  return (
    <section className="hub-section" aria-labelledby="hub-popular-title">
      <div className="hub-container">
        <h2 className="hub-section-title" id="hub-popular-title">Most Popular This Week</h2>
        <div className="hub-popular-grid">
          {lists.map((list) => (
            <article className="hub-popular-card" key={list.title}>
              <h3>{list.title}</h3>
              <ol>
                {list.storyIds.map((id) => {
                  const story = lookup.get(id)
                  if (!story && !extraTitles[id]) return null
                  const title = story?.title ?? extraTitles[id]
                  const metric = story ? (list.metric === 'reads' ? story.reads : `${story[list.metric as 'likes' | 'comments']} ${list.metric}`) : extraMetrics[id]?.[list.metric]
                  return <li key={id}><span className="hub-rank">{list.storyIds.indexOf(id) + 1}</span><span className="hub-popular-story"><strong>{title}</strong><small>{metric}</small></span></li>
                })}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
