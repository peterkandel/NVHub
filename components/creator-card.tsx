import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Creator } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type CreatorCardProps = {
  creator: Creator
  compact?: boolean
}

export function CreatorCard({ creator, compact = false }: CreatorCardProps) {
  return (
    <Card className={cn("border-foreground/10 bg-card/90 shadow-sm", compact && "shadow-none") }>
      <CardContent className={cn("p-4", compact ? "flex items-start gap-3" : "space-y-4") }>
        <Avatar className={compact ? "size-10" : "size-12"}>
          <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className={compact ? "min-w-0 flex-1 space-y-2" : "space-y-2"}>
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">{creator.name}</h3>
            <p className="text-sm text-muted-foreground">@{creator.username} · {creator.title}</p>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{creator.bio}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-cyan-400/20 bg-cyan-500/5 text-cyan-100">{creator.specialty}</Badge>
            <span className="text-xs text-muted-foreground">{creator.projects} projects</span>
            <span className="text-xs text-muted-foreground">{creator.followers} followers</span>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/profile/${creator.username}`}>View profile</Link>
            </Button>
            {!compact && <Button size="sm" variant="secondary">Follow</Button>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}