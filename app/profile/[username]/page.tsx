import Link from "next/link"
import { notFound } from "next/navigation"

import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCreatorByUsername, mockCreators, mockProjects } from "@/lib/mock-data"

type ProfilePageProps = {
  params: Promise<{ username: string }>
}

export async function generateStaticParams() {
  return mockCreators.map((creator) => ({ username: creator.username }))
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const creator = getCreatorByUsername(username)

  if (!creator) {
    notFound()
  }

  const creatorProjects = mockProjects.filter((project) => project.creatorUsername === creator.username)

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-foreground/10 bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Creator profile</Badge>
          <Badge variant="outline">Channel layout</Badge>
        </div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {creator.name}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              @{creator.username} · {creator.title}
            </p>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              {creator.bio}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Follow</Button>
            <Button asChild variant="outline">
              <Link href="/upload">Upload with this creator</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <div className="space-y-6">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList variant="line" className="w-full justify-start gap-2 rounded-none border-b border-foreground/10 bg-transparent p-0">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {creatorProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="border-foreground/10 bg-card shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="text-sm font-medium text-foreground">Channel stats</div>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between"><span>Projects</span><span className="text-foreground">{creator.projects}</span></div>
                <div className="flex items-center justify-between"><span>Followers</span><span className="text-foreground">{creator.followers}</span></div>
                <div className="flex items-center justify-between"><span>Specialty</span><span className="text-foreground">{creator.specialty}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/15 bg-background/70 shadow-none">
            <CardContent className="p-5 text-sm leading-6 text-muted-foreground">
              This page is intentionally a placeholder for a future creator channel,
              complete with uploads, playlists, and community posts.
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}