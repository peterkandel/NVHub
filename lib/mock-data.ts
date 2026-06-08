export type Project = {
  slug: string
  title: string
  creatorName: string
  creatorUsername: string
  category: string
  duration: string
  views: string
  likes: string
  comments: string
  publishedAt: string
  description: string
  tags: string[]
  status: string
}

export type Creator = {
  username: string
  name: string
  title: string
  bio: string
  projects: number
  followers: string
  specialty: string
}

export const feedFilters = [
  "All",
  "Design systems",
  "Dashboard",
  "Landing pages",
  "AI tools",
  "Dev tools",
  "Motion",
]

export const mockProjects: Project[] = [
  {
    slug: "aurora-compose",
    title: "Aurora Compose",
    creatorName: "Maya Singh",
    creatorUsername: "maya-singh",
    category: "Design systems",
    duration: "4:12",
    views: "128K",
    likes: "18.4K",
    comments: "324",
    publishedAt: "2 days ago",
    description:
      "A sleek project browser for design tokens, component states, and launch-ready previews.",
    tags: ["Next.js", "Tailwind", "UI kit"],
    status: "Featured",
  },
  {
    slug: "signal-stack",
    title: "Signal Stack",
    creatorName: "Owen Hart",
    creatorUsername: "owen-hart",
    category: "Dev tools",
    duration: "7:48",
    views: "92K",
    likes: "11.2K",
    comments: "181",
    publishedAt: "5 days ago",
    description:
      "A command palette for shipping faster with analytics, alerts, and CI insights.",
    tags: ["Dashboard", "Metrics", "Productivity"],
    status: "Popular",
  },
  {
    slug: "frameflow",
    title: "Frameflow",
    creatorName: "Lina Gomez",
    creatorUsername: "lina-gomez",
    category: "Motion",
    duration: "5:31",
    views: "76K",
    likes: "9.1K",
    comments: "96",
    publishedAt: "1 week ago",
    description:
      "A motion-first landing experience for indie tools, built around story-driven cards.",
    tags: ["Animation", "Landing page", "Brand"],
    status: "New",
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    creatorName: "Noah Patel",
    creatorUsername: "noah-patel",
    category: "Dashboard",
    duration: "6:09",
    views: "144K",
    likes: "22.8K",
    comments: "517",
    publishedAt: "3 days ago",
    description:
      "A metrics-heavy operating cockpit for teams that need clarity at a glance.",
    tags: ["Metrics", "SaaS", "Ops"],
    status: "Trending",
  },
  {
    slug: "inkframe",
    title: "Inkframe",
    creatorName: "Ari Chen",
    creatorUsername: "ari-chen",
    category: "Landing pages",
    duration: "3:58",
    views: "54K",
    likes: "6.3K",
    comments: "72",
    publishedAt: "6 days ago",
    description:
      "A narrative template for product launches with cinematic spacing and bold type.",
    tags: ["Marketing", "Storytelling", "Launch"],
    status: "Curated",
  },
  {
    slug: "orbit-notes",
    title: "Orbit Notes",
    creatorName: "Zara Khan",
    creatorUsername: "zara-khan",
    category: "AI tools",
    duration: "8:24",
    views: "201K",
    likes: "31.6K",
    comments: "612",
    publishedAt: "Yesterday",
    description:
      "A workspace for AI-assisted note taking, project summaries, and reusable briefs.",
    tags: ["AI", "Notes", "Workflow"],
    status: "Featured",
  },
]

export const mockCreators: Creator[] = [
  {
    username: "maya-singh",
    name: "Maya Singh",
    title: "Product designer",
    bio: "Builds polished interfaces for launch pages, component libraries, and creator tools.",
    projects: 42,
    followers: "128K",
    specialty: "Design systems",
  },
  {
    username: "owen-hart",
    name: "Owen Hart",
    title: "Frontend engineer",
    bio: "Ships dashboards and developer tooling with clean motion and strong information density.",
    projects: 29,
    followers: "94K",
    specialty: "Dev tools",
  },
  {
    username: "lina-gomez",
    name: "Lina Gomez",
    title: "Creative technologist",
    bio: "Explores motion-led product storytelling and high-contrast editorial layouts.",
    projects: 18,
    followers: "76K",
    specialty: "Motion",
  },
  {
    username: "noah-patel",
    name: "Noah Patel",
    title: "Founder",
    bio: "Publishes operator-grade dashboards and systems for teams that move fast.",
    projects: 31,
    followers: "103K",
    specialty: "Dashboards",
  },
  {
    username: "ari-chen",
    name: "Ari Chen",
    title: "Brand developer",
    bio: "Creates launch experiences with strong typographic rhythm and clear narrative flow.",
    projects: 24,
    followers: "61K",
    specialty: "Landing pages",
  },
]

export function getProjectBySlug(slug: string) {
  return mockProjects.find((project) => project.slug === slug)
}

export function getCreatorByUsername(username: string) {
  return mockCreators.find((creator) => creator.username === username)
}