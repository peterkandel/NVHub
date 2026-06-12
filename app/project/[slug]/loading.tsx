import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function LoadingProjectPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
      <div className="space-y-8 animate-pulse">
        <Card className="overflow-hidden border-foreground/10 bg-card/90 shadow-sm">
          <div className="h-[320px] bg-slate-900/70" />
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="h-8 w-24 rounded-full bg-white/10" />
              <Badge className="h-8 w-28 rounded-full bg-white/10" />
            </div>
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded-full bg-slate-700" />
              <div className="h-5 w-1/2 rounded-full bg-slate-700" />
              <div className="h-4 w-full rounded-full bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-foreground/10 bg-card/90 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="h-5 w-40 rounded-full bg-slate-700" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded-full bg-slate-700" />
                <div className="h-4 w-5/6 rounded-full bg-slate-700" />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="h-5 w-40 rounded-full bg-slate-700" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-full bg-slate-700" />
                  <div className="h-4 w-4/5 rounded-full bg-slate-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-foreground/10 bg-card/90 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="h-5 w-28 rounded-full bg-slate-700" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-16 rounded-2xl bg-slate-700" />
                  <div className="h-16 rounded-2xl bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <Card className="border-foreground/10 bg-card/90 shadow-sm">
          <CardContent className="h-60 p-6" />
        </Card>
      </aside>
    </div>
  )
}
