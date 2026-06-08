import { Bookmark, Download, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const actions = [
  { label: "Upvote", icon: ThumbsUp },
  { label: "Bookmark", icon: Bookmark },
  { label: "Share", icon: Share2 },
  { label: "Download", icon: Download },
]

export function ActionSidebar() {
  return (
    <div className="sticky top-24 space-y-4">
      <Card className="border-foreground/10 bg-card/90 shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div>
            <div className="font-heading text-sm font-semibold text-foreground">Project actions</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Sticky controls for quick engagement.
            </p>
          </div>
          <div className="grid gap-2">
            {actions.map((action) => {
              const Icon = action.icon

              return (
                <Button key={action.label} variant="outline" className="justify-start gap-2 border-white/10 bg-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/5 hover:shadow-[0_12px_30px_-20px_rgba(14,165,233,0.6)]">
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