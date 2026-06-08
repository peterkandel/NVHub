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
    <Card className={cn("overflow-hidden border-foreground/10 bg-card shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg", featured && "sm:col-span-2 xl:col-span-1") }>
      <Link href={`/project/${project.slug}`} className="group block">
        <div className={cn("relative aspect-video overflow-hidden bg-gradient-to-br", gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.28),transparent_30%)]" />
          <div className="absolute inset-0 flex items-end justify-between p-4 text-white">
            <div className="max-w-[75%]">
              <Badge className="bg-white/15 text-white backdrop-blur-sm">{project.status}</Badge>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
              <Play className="size-3 fill-current" />
              {project.duration}
            </div>
          </div>
        </div>
        <CardContent className="space-y-3 p-4">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-sm font-medium leading-6 text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.creatorName} · {project.category}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background/60">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.views} views</span>
            <span>{project.publishedAt}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}