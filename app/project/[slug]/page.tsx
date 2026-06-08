import Link from "next/link"
import { notFound } from "next/navigation"

import { ActionSidebar } from "@/components/action-sidebar"
import { CreatorCard } from "@/components/creator-card"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCreatorByUsername, getProjectBySlug, mockProjects } from "@/lib/mock-data"
import { Download, ExternalLink, Eye, Play } from "lucide-react"

type ProjectPageProps = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const creator = getCreatorByUsername(project.creatorUsername)
  const relatedProjects = mockProjects.filter((item) => item.slug !== project.slug).slice(0, 3)

  const sourceLinks = [
    {
      label: "Live demo",
      href: `https://example.com/projects/${project.slug}`,
      description: "Preview the shipped experience.",
    },
    {
      label: "Source code",
      href: `https://github.com/example/${project.slug}`,
      description: "Open the mocked repository shell.",
    },
    {
      label: "Design notes",
      href: `https://notion.so/example/${project.slug}`,
      description: "Read the planning notes and launch context.",
    },
  ]

  const overviewPoints = [
    `A ${project.category.toLowerCase()} project created by ${project.creatorName}.`,
    `Published ${project.publishedAt} and already pulling ${project.views} views.`,
    `Designed to look and feel like a product walkthrough instead of a static card.`,
  ]

  const problemSolved = [
    "Gives developers a dedicated surface to showcase projects with the same clarity as a video page.",
    "Keeps discovery, context, and creator identity on one scrollable detail experience.",
    "Helps visitors judge the value of a project without leaving the page immediately.",
  ]

  const features = [
    "Large demo video placeholder with a product-first frame.",
    "Clear project story sections for context and decision-making.",
    "Sticky engagement controls for quick upvote, bookmark, share, and download actions.",
    "Related project recommendations to extend browsing sessions.",
  ]

  const techStack = ["Next.js 16 App Router", "React 19", "TypeScript", "Tailwind CSS", ...project.tags]

  const difficulty = project.status === "Featured" || project.status === "Trending" ? "Intermediate" : "Beginner-friendly"
  const developmentStage = project.status === "New" ? "Early release" : project.status === "Curated" ? "Polished preview" : "Public showcase"

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
      <div className="space-y-8">
        <Card className="overflow-hidden border-foreground/10 bg-card/90 shadow-sm">
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.55))]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/10 text-white">Demo video placeholder</Badge>
                <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-end justify-between gap-4 text-white">
                <div className="max-w-2xl space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Play className="size-4" />
                    4 minute demo preview
                  </div>
                  <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="hidden rounded-2xl border border-white/10 bg-black/30 p-3 text-right shadow-lg backdrop-blur-sm sm:block">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Creator</div>
                  <div className="mt-1 text-sm font-medium text-white">{project.creatorName}</div>
                  <div className="mt-2 text-xs text-slate-300">{project.category}</div>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{project.views} views</span>
              <span>•</span>
              <span>{project.likes} upvotes</span>
              <span>•</span>
              <span>{project.publishedAt}</span>
              <span>•</span>
              <span>{project.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/5 text-slate-100">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                <Eye className="size-4" />
                Overview
              </div>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                {overviewPoints.join(" ")}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="font-heading text-sm font-semibold text-foreground">Problem solved</div>
                <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {problemSolved.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="font-heading text-sm font-semibold text-foreground">Features</div>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {features.map((feature) => (
                    <li key={feature} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="font-heading text-sm font-semibold text-foreground">Tech stack</div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((item) => (
                    <Badge key={item} variant="outline" className="border-white/10 bg-white/5 text-slate-100">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Difficulty</div>
                  <div className="mt-2 text-sm font-medium text-foreground">{difficulty}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Development stage</div>
                  <div className="mt-2 text-sm font-medium text-foreground">{developmentStage}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Download className="size-4" />
                Source links
              </div>
              <div className="grid gap-3 lg:grid-cols-3">
                {sourceLinks.map((source) => (
                  <a
                    key={source.label}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-500/5 hover:shadow-[0_16px_35px_-22px_rgba(14,165,233,0.5)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium text-foreground">{source.label}</div>
                      <ExternalLink className="size-4 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.description}</p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {creator && <CreatorCard creator={creator} />}
        </div>
      </div>

      <aside>
        <ActionSidebar />
      </aside>

      <section className="space-y-4 lg:col-span-2">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Related projects</h2>
            <p className="text-sm text-muted-foreground">More cards from the same mock feed.</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/">Back to feed</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {relatedProjects.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </div>
  )
}