import { Bookmark, Download, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Project } from "@/lib/mock-data"

type ActionSidebarProps = {
  project: Project
}

const actions = [
  { label: "Upvote", icon: ThumbsUp },
  { label: "Bookmark", icon: Bookmark },
  { label: "Share", icon: Share2 },
  { label: "Download", icon: Download },
]

export function ActionSidebar({ project }: ActionSidebarProps) {
  return (
    <div className="sticky top-24 space-y-4">
      <Card className="border-foreground/10 bg-card shadow-sm">
        <CardContent className="space-y-4 p-4">
          <div>
            <div className="text-sm font-medium text-foreground">Project actions</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Sticky controls for quick engagement.
            </p>
          </div>
          <div className="grid gap-2">
            {actions.map((action) => {
              const Icon = action.icon

              return (
                <Button key={action.label} variant="outline" className="justify-start gap-2 transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/5">
                  <Icon className="size-4" />
                  {action.label}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}