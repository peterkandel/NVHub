"use client"

import * as React from "react"
import { Search, TrendingUp } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type FeedGridProps = {
  projects: Project[]
  filters: string[]
}

type FeedMode = "trending" | "newest"

function sortProjects(projects: Project[], mode: FeedMode) {
  return [...projects].sort((left, right) => {
    if (mode === "newest") {
      return left.slug.localeCompare(right.slug)
    }

    return right.views.localeCompare(left.views, undefined, { numeric: true })
  })
}

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-sm">
      <div className="aspect-video animate-pulse bg-white/10" />
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-white/10" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 animate-pulse rounded-full bg-white/10" />
          <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
      <div className="rounded-full border border-white/10 bg-white/10 p-3 text-cyan-300">
        <Search className="size-5" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">No projects matched</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        Try a different tag, switch the sort order, or clear the search field to
        bring items back into view.
      </p>
      <Button className="mt-5 bg-white text-slate-950 hover:bg-slate-200" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  )
}

export function FeedGrid({ projects, filters }: FeedGridProps) {
  const [mode, setMode] = React.useState<FeedMode>("trending")
  const [selectedTag, setSelectedTag] = React.useState("All")
  const [search, setSearch] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const deferredSearch = React.useDeferredValue(search)

  React.useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [])

  const visibleProjects = React.useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    const filtered = projects.filter((project) => {
      const matchesTag = selectedTag === "All" || project.tags.includes(selectedTag)
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [project.title, project.creatorName, project.category, project.description, ...project.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesTag && matchesSearch
    })

    return sortProjects(filtered, mode)
  }, [deferredSearch, mode, projects, selectedTag])

  const clearFilters = () => {
    setSelectedTag("All")
    setSearch("")
    setMode("trending")
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.14),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] shadow-[0_30px_120px_-50px_rgba(0,0,0,0.9)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:px-10 lg:py-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/10 bg-white/10 text-white">Discovery feed</Badge>
              <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-200">
                Modern dark theme
              </Badge>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="balance-text text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover developer projects like you discover videos.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Kitab Studio turns launches, demos, and side projects into a feed
                built for browsing, saving, and following what matters.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["20 projects", "Fresh mock discovery feed"],
                ["Trending now", "What people are opening next"],
                ["Built for scroll", "Responsive cards and sections"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
                  <div className="mt-2 text-sm font-medium text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Search className="size-4 text-cyan-300" />
              Search across the feed
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                aria-label="Search projects"
                placeholder="Search projects, creators, stacks"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 rounded-full border-white/10 bg-slate-950/60 pl-10 text-white placeholder:text-slate-500"
              />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={mode === "trending" ? "default" : "outline"}
                className={cn(
                  "rounded-full",
                  mode === "trending"
                    ? "bg-white text-slate-950 hover:bg-slate-200"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                )}
                onClick={() => setMode("trending")}
              >
                <TrendingUp className="size-4" />
                Trending
              </Button>
              <Button
                type="button"
                size="sm"
                variant={mode === "newest" ? "default" : "outline"}
                className={cn(
                  "rounded-full",
                  mode === "newest"
                    ? "bg-white text-slate-950 hover:bg-slate-200"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                )}
                onClick={() => setMode("newest")}
              >
                Newest
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <div
                  key={project.slug}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 transition-colors hover:bg-slate-950/70"
                >
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{project.creatorName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <TrendingUp className="size-4" />
              Feed controls
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Trending, newest, and tag filtering
            </h2>
          </div>
          <Button variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter === selectedTag

            return (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant={active ? "default" : "outline"}
                className={cn(
                  "rounded-full transition-all duration-200",
                  active
                    ? "bg-white text-slate-950 shadow-lg shadow-cyan-500/10 hover:bg-slate-200"
                    : "border-white/10 bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:bg-white/10"
                )}
                onClick={() => setSelectedTag(filter)}
              >
                {filter}
              </Button>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} visible
          </span>
          <span className="transition-opacity duration-200">{mode === "trending" ? "Sorted by upvotes" : "Sorted by newest"}</span>
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : visibleProjects.length === 0 ? (
          <EmptyState onReset={clearFilters} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProjects.map((project, index) => (
              <div
                key={project.slug}
                className="transition-all duration-300 ease-out hover:-translate-y-1"
              >
                <ProjectCard project={project} featured={index === 0 && mode === "trending"} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
