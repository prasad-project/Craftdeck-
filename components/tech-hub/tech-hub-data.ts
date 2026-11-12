export type ArtworkKind = "orange-orb" | "purple-blocks" | "target" | "dot-orb" | "green-wave" | "navy-orb"

export type Story = {
  id: string
  title: string
  category: string
  summary: string
  source: string
  date: string
  dateLabel: string
  readTime: number
  likes: number
  comments: number
  reads: string
  art: ArtworkKind
  topics: string[]
}

export type Video = {
  id: string
  title: string
  summary: string
  creator: string
  date: string
  duration: string
  likes: number
  comments: number
  art: ArtworkKind
}

export const categories = [
  "For You",
  "Latest News",
  "Artificial Intelligence",
  "Data Science & ML",
  "Programming",
  "Startups & Business",
  "Developer Tools",
  "Tech Vlogs",
  "Tutorials & Guides",
  "Cybersecurity",
]

export const topics = [
  "Agentic AI",
  "OpenAI",
  "Gemini",
  "Claude",
  "Python",
  "LangChain",
  "Machine Learning",
  "Robotics",
  "Cloud Computing",
  "Open Source",
]

export const featuredStory: Story = {
  id: "open-source-model",
  title: "Open-source coding model closes the gap with paid tools",
  category: "Artificial Intelligence",
  summary: "Benchmarks show a new community model matching commercial assistants on common programming tasks.",
  source: "TechWire",
  date: "2026-11-11T08:40:00",
  dateLabel: "11 Nov · 08:40",
  readTime: 6,
  likes: 248,
  comments: 32,
  reads: "4.2k reads",
  art: "orange-orb",
  topics: ["Open Source", "OpenAI", "Agentic AI"],
}

export const sideStories: Story[] = [
  {
    id: "phishing-kits",
    title: "Phishing kits now target developer accounts",
    category: "Cybersecurity",
    summary: "Attackers are tailoring credential traps to software teams.",
    source: "Byte Report",
    date: "2026-11-11T07:15:00",
    dateLabel: "11 Nov · 07:15",
    readTime: 5,
    likes: 131,
    comments: 18,
    reads: "3.8k reads",
    art: "dot-orb",
    topics: ["Cloud Computing", "Python"],
  },
  {
    id: "database-index-tour",
    title: "A 12-minute tour of how databases index data",
    category: "Tech Vlogs",
    summary: "A clear visual guide to indexes and query performance.",
    source: "Systems Explained",
    date: "2026-11-10T18:00:00",
    dateLabel: "10 Nov · 18:00",
    readTime: 12,
    likes: 96,
    comments: 9,
    reads: "2.4k reads",
    art: "green-wave",
    topics: ["Cloud Computing", "Tutorials & Guides"],
  },
]

export const stories: Story[] = [
  {
    id: "rust-adoption",
    title: "Rust adoption grows in backend teams, survey finds",
    category: "Programming",
    summary: "Developers cite safety and speed as the main reasons for switching.",
    source: "Dev Daily",
    date: "2026-11-11T08:10:00",
    dateLabel: "11 Nov",
    readTime: 4,
    likes: 88,
    comments: 11,
    reads: "3.1k reads",
    art: "purple-blocks",
    topics: ["Python", "Open Source"],
  },
  {
    id: "package-manager",
    title: "A faster package manager lands for JavaScript projects",
    category: "Developer Tools",
    summary: "Installs are up to three times faster on large repositories.",
    source: "Dev Daily",
    date: "2026-11-11T07:50:00",
    dateLabel: "11 Nov",
    readTime: 3,
    likes: 64,
    comments: 7,
    reads: "2.9k reads",
    art: "target",
    topics: ["Open Source", "Python"],
  },
  {
    id: "two-factor-prompts",
    title: "Two-factor prompts get an upgrade across major sites",
    category: "Cybersecurity",
    summary: "Passkeys are replacing one-time codes for millions of users.",
    source: "Byte Report",
    date: "2026-11-10T17:20:00",
    dateLabel: "10 Nov",
    readTime: 5,
    likes: 112,
    comments: 15,
    reads: "2.6k reads",
    art: "dot-orb",
    topics: ["Cloud Computing", "OpenAI"],
  },
  {
    id: "ai-infrastructure-funding",
    title: "Seed funding shifts toward AI infrastructure",
    category: "Startups & Business",
    summary: "Investors back tools that make models cheaper to run.",
    source: "Startup Wire",
    date: "2026-11-10T13:05:00",
    dateLabel: "10 Nov",
    readTime: 4,
    likes: 47,
    comments: 5,
    reads: "2.2k reads",
    art: "orange-orb",
    topics: ["Agentic AI", "OpenAI", "Cloud Computing"],
  },
  {
    id: "evaluating-models",
    title: "A practical guide to evaluating machine learning models",
    category: "Data Science & ML",
    summary: "Precision, recall and when each one matters.",
    source: "Data Notes",
    date: "2026-11-10T10:30:00",
    dateLabel: "10 Nov",
    readTime: 7,
    likes: 73,
    comments: 9,
    reads: "1.8k reads",
    art: "green-wave",
    topics: ["Machine Learning", "Gemini", "Robotics"],
  },
  {
    id: "agent-handoffs",
    title: "Agents learn to hand work back to humans",
    category: "Artificial Intelligence",
    summary: "New research shows safer hand-offs in multi-step tasks.",
    source: "AI Digest",
    date: "2026-11-09T16:15:00",
    dateLabel: "9 Nov",
    readTime: 6,
    likes: 95,
    comments: 13,
    reads: "1.7k reads",
    art: "purple-blocks",
    topics: ["Agentic AI", "Claude", "LangChain"],
  },
  {
    id: "https-safety",
    title: "How HTTPS keeps your data safe",
    category: "Tutorials & Guides",
    summary: "A practical introduction to certificates, encryption and trust.",
    source: "Web Notes",
    date: "2026-11-09T12:10:00",
    dateLabel: "9 Nov",
    readTime: 8,
    likes: 81,
    comments: 10,
    reads: "2.7k reads",
    art: "target",
    topics: ["Cloud Computing", "Tutorials & Guides"],
  },
  {
    id: "database-indexes",
    title: "Why database indexes make queries feel instant",
    category: "Tech Vlogs",
    summary: "A visual introduction to the data structures behind fast lookups.",
    source: "Systems Explained",
    date: "2026-11-08T18:00:00",
    dateLabel: "8 Nov",
    readTime: 5,
    likes: 96,
    comments: 9,
    reads: "2.4k reads",
    art: "green-wave",
    topics: ["Cloud Computing", "Machine Learning"],
  },
  {
    id: "edge-computing",
    title: "Edge computing gets a lift from smaller models",
    category: "Artificial Intelligence",
    summary: "New inference runtimes bring capable models closer to users.",
    source: "AI Digest",
    date: "2026-11-08T11:40:00",
    dateLabel: "8 Nov",
    readTime: 5,
    likes: 58,
    comments: 8,
    reads: "1.5k reads",
    art: "navy-orb",
    topics: ["Gemini", "Robotics", "Machine Learning"],
  },
  {
    id: "open-source-mapping",
    title: "Open-source maintainers make dependency maps easier to read",
    category: "Developer Tools",
    summary: "A new generation of tools helps teams understand software supply chains.",
    source: "Dev Daily",
    date: "2026-11-07T09:30:00",
    dateLabel: "7 Nov",
    readTime: 4,
    likes: 52,
    comments: 6,
    reads: "1.2k reads",
    art: "purple-blocks",
    topics: ["Open Source", "Python"],
  },
  {
    id: "robotics-labs",
    title: "Research labs bring low-cost robotics kits to classrooms",
    category: "Data Science & ML",
    summary: "Accessible hardware is making hands-on machine learning more common.",
    source: "Data Notes",
    date: "2026-11-06T15:00:00",
    dateLabel: "6 Nov",
    readTime: 6,
    likes: 69,
    comments: 12,
    reads: "1.6k reads",
    art: "orange-orb",
    topics: ["Robotics", "Machine Learning"],
  },
  {
    id: "team-ai-guidelines",
    title: "Small teams publish practical guidelines for using AI at work",
    category: "Startups & Business",
    summary: "Clear boundaries help product teams adopt new tools with confidence.",
    source: "Startup Wire",
    date: "2026-11-05T08:20:00",
    dateLabel: "5 Nov",
    readTime: 5,
    likes: 42,
    comments: 4,
    reads: "1.1k reads",
    art: "dot-orb",
    topics: ["Claude", "LangChain", "Agentic AI"],
  },
]

export const videos: Video[] = [
  {
    id: "ai-agent-video",
    title: "Build an AI agent in 20 minutes",
    summary: "A step-by-step walkthrough for beginners.",
    creator: "CodeWithMira",
    date: "10 Nov",
    duration: "18:42",
    likes: 210,
    comments: 34,
    art: "navy-orb",
  },
  {
    id: "database-video",
    title: "How databases index your data",
    summary: "B-trees explained with simple animations.",
    creator: "Systems Explained",
    date: "10 Nov",
    duration: "12:05",
    likes: 96,
    comments: 9,
    art: "orange-orb",
  },
  {
    id: "linux-video",
    title: "Ten Linux terminal tricks",
    summary: "Save hours with small shortcuts.",
    creator: "ShellSchool",
    date: "9 Nov",
    duration: "09:30",
    likes: 142,
    comments: 21,
    art: "dot-orb",
  },
  {
    id: "modern-css-video",
    title: "What’s new in modern CSS",
    summary: "Container queries, nesting and more.",
    creator: "FrontEnd Weekly",
    date: "8 Nov",
    duration: "14:10",
    likes: 78,
    comments: 6,
    art: "green-wave",
  },
]

export const popularLists = [
  {
    title: "Most read",
    metric: "reads",
    storyIds: ["open-source-model", "phishing-kits", "rust-adoption", "https-safety"],
  },
  {
    title: "Most liked",
    metric: "likes",
    storyIds: ["open-source-model", "ai-agent-video", "linux-video", "two-factor-prompts"],
  },
  {
    title: "Most discussed",
    metric: "comments",
    storyIds: ["open-source-model", "ai-agent-video", "linux-video", "phishing-kits"],
  },
]
