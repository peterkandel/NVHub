"use client"

import * as React from "react"
import { FeedGrid } from "@/components/feed-grid"
import { feedFilters } from "@/lib/mock-data"

type ProjectRow = any

function mapRowToProject(row: ProjectRow) {
  const publishedAt = new Date(row.created_at).toLocaleDateString()
  return {
    slug: row.slug,
    title: row.title,
    creatorName: row.creator?.username ?? "Unknown",
    creatorUsername: row.creator?.username ?? "unknown",
    category: row.category ?? "Uncategorized",
    duration: row.video_duration ?? "N/A",
    views: "0",
    likes: "0",
    comments: "0",
    publishedAt,
    description: row.description ?? "",
    tags: Array.isArray(row.tech_stack) ? row.tech_stack : [],
    status: row.stage ?? "Published",
    difficulty: row.difficulty ?? "",
    developmentStage: row.stage ?? "",
    upvotes: "0",
    bookmarks: "0",
    thumbnailPath: "",
    sourceLinks: [],
  }
}

export function FeedList() {
  const [projects, setProjects] = React.useState<any[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const data = await res.json()
        if (!mounted) return

        const mapped = (data ?? []).map(mapRowToProject)
        setProjects(mapped)
      } catch (err) {
        if (!mounted) return
        setError(err instanceof Error ? err.message : String(err))
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Unable to load feed</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (projects === null) {
    // loading skeleton: reuse FeedGrid's built-in skeleton by passing empty projects and letting its local loader run
    return <div className="p-6">Loading projects…</div>
  }

  if (projects.length === 0) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold">No projects yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">There are no published projects to show.</p>
      </div>
    )
  }

  return <FeedGrid projects={projects} filters={feedFilters} />
}
