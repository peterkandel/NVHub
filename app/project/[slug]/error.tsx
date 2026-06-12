"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)] p-8">
      <div className="space-y-6">
        <Card className="border-foreground/10 bg-card/90 shadow-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="size-5" />
              <h1 className="text-xl font-semibold">Unable to load project</h1>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              There was a problem loading this project. Please try again.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={() => reset()}>Retry</Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to feed</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
