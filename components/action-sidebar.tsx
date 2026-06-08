import { Bookmark, Download, Flag, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Project } from "@/lib/mock-data"

type ActionSidebarProps = {
  project: Project
}

const actions = [
  { label: "Like", icon: Heart },
  { label: "Save", icon: Bookmark },
  { label: "Share", icon: Share2 },
  { label: "Download", icon: Download },
]

export function ActionSidebar({ project }: ActionSidebarProps) {
  return (
    <div className="space-y-4">
      <Card className="border-foreground/10 bg-card shadow-sm">
        <CardContent className="space-y-4 p-4">
          <div>
            <div className="text-sm font-medium text-foreground">Project actions</div>
            <p className="mt-1 text-sm text-muted-foreground">Frontend-only controls for the detail page.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {actions.map((action) => {
              const Icon = action.icon

              return (
                <Button key={action.label} variant="outline" className="justify-start gap-2">
                  <Icon className="size-4" />
                  {action.label}
                </Button>
              )
            })}
          </div>
          <Separator />
          <div className="grid gap-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between"><span>Views</span><span className="text-foreground">{project.views}</span></div>
            <div className="flex items-center justify-between"><span>Likes</span><span className="text-foreground">{project.likes}</span></div>
            <div className="flex items-center justify-between"><span>Comments</span><span className="text-foreground">{project.comments}</span></div>
          </div>
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
        <Flag className="size-4" />
        Report project
      </Button>
    </div>
  )
}