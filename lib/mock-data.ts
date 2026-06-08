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
  {
    slug: "northstar-board",
    title: "Northstar Board",
    creatorName: "Elena Park",
    creatorUsername: "elena-park",
    category: "Dashboard",
    duration: "6:41",
    views: "88K",
    likes: "13.5K",
    comments: "214",
    publishedAt: "4 days ago",
    description:
      "A leadership dashboard for high-signal metrics, launch milestones, and team health.",
    tags: ["Analytics", "Ops", "B2B"],
    status: "Trending",
  },
  {
    slug: "frameforge",
    title: "Frameforge",
    creatorName: "Daniel Ross",
    creatorUsername: "daniel-ross",
    category: "Motion",
    duration: "5:18",
    views: "67K",
    likes: "8.8K",
    comments: "113",
    publishedAt: "3 days ago",
    description:
      "A product launch with cinematic motion, layered storytelling, and bold panels.",
    tags: ["Animation", "Launch", "Story"],
    status: "Popular",
  },
  {
    slug: "sparkforge",
    title: "Sparkforge",
    creatorName: "Priya Nair",
    creatorUsername: "priya-nair",
    category: "AI tools",
    duration: "7:02",
    views: "154K",
    likes: "24.1K",
    comments: "401",
    publishedAt: "Yesterday",
    description:
      "An AI studio for generating briefs, summarizing builds, and shipping faster.",
    tags: ["AI", "Workflow", "Productivity"],
    status: "Featured",
  },
  {
    slug: "lattice-lab",
    title: "Lattice Lab",
    creatorName: "Samir Ali",
    creatorUsername: "samir-ali",
    category: "Design systems",
    duration: "4:47",
    views: "73K",
    likes: "10.7K",
    comments: "152",
    publishedAt: "1 week ago",
    description:
      "A component playground for visualizing tokens, states, and responsive layouts.",
    tags: ["Components", "Tokens", "Library"],
    status: "Curated",
  },
  {
    slug: "summit-pages",
    title: "Summit Pages",
    creatorName: "Tara Williams",
    creatorUsername: "tara-williams",
    category: "Landing pages",
    duration: "3:36",
    views: "41K",
    likes: "5.9K",
    comments: "64",
    publishedAt: "2 weeks ago",
    description:
      "A launch page system for product announcements with editorial pacing and sharp CTA hierarchy.",
    tags: ["Marketing", "Landing page", "Conversion"],
    status: "New",
  },
  {
    slug: "flux-mentor",
    title: "Flux Mentor",
    creatorName: "Jordan Kim",
    creatorUsername: "jordan-kim",
    category: "Dev tools",
    duration: "8:11",
    views: "112K",
    likes: "16.9K",
    comments: "289",
    publishedAt: "6 days ago",
    description:
      "A dev assistant dashboard for linting, QA checks, and release readiness.",
    tags: ["CLI", "Developer tools", "Automation"],
    status: "Trending",
  },
  {
    slug: "pixel-harbor",
    title: "Pixel Harbor",
    creatorName: "Mina Shah",
    creatorUsername: "mina-shah",
    category: "Design systems",
    duration: "4:03",
    views: "58K",
    likes: "7.4K",
    comments: "101",
    publishedAt: "5 days ago",
    description:
      "A visual inventory for UI assets, design checks, and team-ready component references.",
    tags: ["UI kit", "Inventory", "Design"],
    status: "Popular",
  },
  {
    slug: "open-loop",
    title: "Open Loop",
    creatorName: "Ben Carter",
    creatorUsername: "ben-carter",
    category: "Dashboard",
    duration: "6:55",
    views: "97K",
    likes: "12.3K",
    comments: "209",
    publishedAt: "4 days ago",
    description:
      "An operations dashboard for tracking launches, blockers, and momentum.",
    tags: ["Metrics", "Workflow", "Ops"],
    status: "Trending",
  },
  {
    slug: "nova-notes",
    title: "Nova Notes",
    creatorName: "Hana Ito",
    creatorUsername: "hana-ito",
    category: "AI tools",
    duration: "5:44",
    views: "138K",
    likes: "20.4K",
    comments: "331",
    publishedAt: "Yesterday",
    description:
      "A note-taker that turns research sessions into structured, reusable summaries.",
    tags: ["AI", "Notes", "Research"],
    status: "Featured",
  },
  {
    slug: "studio-radar",
    title: "Studio Radar",
    creatorName: "Luis Moreno",
    creatorUsername: "luis-moreno",
    category: "Dev tools",
    duration: "7:19",
    views: "84K",
    likes: "9.9K",
    comments: "146",
    publishedAt: "3 days ago",
    description:
      "A release companion for monitoring errors, changelogs, and feedback loops.",
    tags: ["Monitoring", "Product", "Releases"],
    status: "Curated",
  },
  {
    slug: "orbit-garden",
    title: "Orbit Garden",
    creatorName: "Felix Grant",
    creatorUsername: "felix-grant",
    category: "Motion",
    duration: "5:26",
    views: "61K",
    likes: "7.8K",
    comments: "92",
    publishedAt: "2 weeks ago",
    description:
      "A motion playground with smooth transitions, layered cards, and guided reveals.",
    tags: ["Motion", "UI", "Experiments"],
    status: "Popular",
  },
  {
    slug: "launchpad-one",
    title: "Launchpad One",
    creatorName: "Riya Desai",
    creatorUsername: "riya-desai",
    category: "Landing pages",
    duration: "4:55",
    views: "72K",
    likes: "9.2K",
    comments: "138",
    publishedAt: "5 days ago",
    description:
      "A polished go-to-market template for startups, products, and experimental websites.",
    tags: ["Startup", "Template", "Marketing"],
    status: "Trending",
  },
  {
    slug: "vector-vault",
    title: "Vector Vault",
    creatorName: "Noel Brooks",
    creatorUsername: "noel-brooks",
    category: "Design systems",
    duration: "6:12",
    views: "95K",
    likes: "14.6K",
    comments: "227",
    publishedAt: "4 days ago",
    description:
      "A system browser for icons, tokens, and reusable visual building blocks.",
    tags: ["Icons", "Tokens", "Design"],
    status: "Featured",
  },
  {
    slug: "delta-desk",
    title: "Delta Desk",
    creatorName: "Anaya Patel",
    creatorUsername: "anaya-patel",
    category: "Dashboard",
    duration: "7:07",
    views: "119K",
    likes: "17.3K",
    comments: "266",
    publishedAt: "Yesterday",
    description:
      "A team desk for sprint health, product feedback, and project prioritization.",
    tags: ["Planning", "Dashboard", "Teams"],
    status: "Trending",
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