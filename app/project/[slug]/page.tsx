import Link from "next/link"
import { notFound } from "next/navigation"

import { ActionSidebar } from "@/components/action-sidebar"
import { CreatorCard } from "@/components/creator-card"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getCreatorByUsername, getProjectBySlug, mockProjects } from "@/lib/mock-data"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
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

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <div className="space-y-6">
          <Card className="overflow-hidden border-foreground/10 bg-card shadow-sm">
            <div className="aspect-video bg-gradient-to-br from-slate-900 via-sky-700 to-cyan-500" />
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.status}</Badge>
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant="outline">{project.duration}</Badge>
              </div>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{project.views} views</span>
                <span>•</span>
                <span>{project.likes} likes</span>
                <span>•</span>
                <span>{project.publishedAt}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-card shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">About this project</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A watch-page scaffold that can later surface comments, chapters,
                    attachments, and version history.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/upload">Publish a similar project</Link>
                </Button>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Stack", "Next.js + Tailwind"],
                  ["Mode", "Static placeholder"],
                  ["Surface", "Project detail page"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-muted/50 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                    <div className="mt-2 text-sm font-medium text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {creator && <CreatorCard creator={creator} />}
        </div>

        <aside>
          <ActionSidebar project={project} />
        </aside>
      </div>

      <section className="space-y-4">
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