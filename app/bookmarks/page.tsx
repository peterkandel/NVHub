import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProjectsBySlugs, mockCurrentUser } from "@/lib/mock-data"
import { BookmarkCheck, Clock3, FolderHeart, Sparkles } from "lucide-react"

export default function BookmarksPage() {
  const savedProjects = getProjectsBySlugs(mockCurrentUser.savedProjectSlugs)
  const recentSaves = savedProjects.slice(0, 4)

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Bookmarks</Badge>
          <Badge variant="outline">Peter&apos;s library</Badge>
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:items-end">
          <div className="space-y-4">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Saved projects with a clean, high-signal workspace.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This is a fake logged-in experience for Peter. The page keeps bookmarked projects, recent saves, and quick actions in one place.
            </p>
          </div>
          <Card className="border-foreground/10 bg-background/75 shadow-sm backdrop-blur">
            <CardContent className="grid gap-3 p-4 sm:grid-cols-3">
              <StatsTile icon={BookmarkCheck} label="Saved projects" value={String(savedProjects.length)} />
              <StatsTile icon={FolderHeart} label="Collections" value="3" />
              <StatsTile icon={Clock3} label="Updated" value="Today" />
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm text-cyan-300">
                <Sparkles className="size-4" />
                Saved projects UI
              </div>
              <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-white">Your bookmarked projects</h2>
            </div>
            <Button asChild variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white">
              <Link href="/">Back to feed</Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {savedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <div className="font-heading text-sm font-semibold text-foreground">Recent saves</div>
                <p className="mt-1 text-sm text-muted-foreground">A compact preview of the latest bookmarked projects.</p>
              </div>
              <div className="space-y-2">
                {recentSaves.map((project) => (
                  <Link key={project.slug} href={`/project/${project.slug}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-500/5">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 text-xs font-semibold text-white">
                      {project.title.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{project.title}</div>
                      <div className="truncate text-xs text-slate-400">{project.creatorName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="font-heading text-sm font-semibold text-foreground">Collections</div>
              <div className="space-y-3">
                {[
                  ["Launch ideas", "3 projects"],
                  ["Productivity stack", "2 projects"],
                  ["Open source watchlist", "3 projects"],
                ].map(([name, count]) => (
                  <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-medium text-white">{name}</div>
                    <div className="mt-1 text-xs text-slate-400">{count}</div>
                  </div>
                ))}
              </div>
              <Separator className="bg-white/10" />
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-4 text-sm leading-6 text-slate-300">
                Bookmarks remain frontend only. They behave like a polished saved-items surface without real persistence or authentication.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function StatsTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <Icon className="size-4 text-cyan-300" />
        {label}
      </div>
      <div className="mt-2 font-heading text-base font-semibold text-white">{value}</div>
    </div>
  )
}