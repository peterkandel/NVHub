import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-foreground/10 bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Upload route</Badge>
          <Badge variant="outline">Placeholder only</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Publish a project preview
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          This route is the architectural stub for future publishing flows, drafts,
          asset uploads, and metadata entry.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
        <Card className="border-foreground/10 bg-card shadow-sm">
          <CardContent className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project title</label>
                <Input placeholder="Aurora Compose" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input placeholder="aurora-compose" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Short description</label>
              <Textarea placeholder="Explain the project, audience, and stack." rows={5} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="Category" />
              <Input placeholder="Duration" />
              <Input placeholder="Tags" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Save draft</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/15 bg-background/70 shadow-none">
          <CardContent className="space-y-4 p-6">
            <div>
              <div className="text-sm font-medium text-foreground">Publishing checklist</div>
              <p className="mt-1 text-sm text-muted-foreground">
                A future backend can hook into this exact shape.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Cover thumbnail</li>
              <li>Creator identity</li>
              <li>Stack and tags</li>
              <li>Video-style preview metadata</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}