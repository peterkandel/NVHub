import Link from "next/link"
import { Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  project: Project
  featured?: boolean
}

const thumbnailGradients = [
  "from-sky-500/70 via-cyan-500/30 to-background",
  "from-fuchsia-500/70 via-rose-500/30 to-background",
  "from-amber-500/70 via-orange-500/30 to-background",
  "from-emerald-500/70 via-teal-500/30 to-background",
]

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const gradient = thumbnailGradients[project.title.length % thumbnailGradients.length]

  return (
    <Card
      className={cn(
        "group overflow-hidden border-foreground/10 bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(14,165,233,0.45)] hover:border-cyan-400/30",
        featured && "sm:col-span-2 xl:col-span-1"
      )}
    >
      <Link href={`/project/${project.slug}`} className="group block focus-visible:outline-none">
        <div className={cn("relative aspect-video overflow-hidden bg-gradient-to-br transition-transform duration-300 group-hover:scale-[1.02]", gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.28),transparent_30%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-end justify-between p-4 text-white">
            <div className="max-w-[75%]">
              <Badge className="bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-[-2px]">{project.status}</Badge>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-[-2px]">
              <Play className="size-3 fill-current" />
              {project.duration}
            </div>
          </div>
        </div>
        <CardContent className="space-y-3 p-4">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-sm font-medium leading-6 text-foreground transition-colors duration-200 group-hover:text-cyan-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-slate-300">
              {project.creatorName} · {project.category}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/10 bg-background/60 transition-colors duration-200 group-hover:border-cyan-400/30 group-hover:bg-white/10">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground transition-colors duration-200 group-hover:text-slate-300">
            <span>{project.views} views</span>
            <span>{project.publishedAt}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}