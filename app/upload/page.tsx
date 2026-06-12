"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileVideo2,
  Layers3,
  ListChecks,
  Rocket,
  Sparkles,
  Upload,
} from "lucide-react"

type Difficulty = "Beginner" | "Intermediate" | "Advanced"

type WorkflowState = {
  title: string
  slug: string
  category: string
  creator: string
  description: string
  demoVideoUrl: string
  thumbnailUrl: string
  videoDuration: string
  problem: string
  audience: string
  solution: string
  stack: string
  difficulty: Difficulty
  liveUrl: string
  repoUrl: string
  notes: string
}

type StepId =
  | "project"
  | "video"
  | "problem"
  | "stack"
  | "difficulty"
  | "sources"
  | "review"

type ValidationItem = {
  label: string
  ok: boolean
  hint: string
}

type StepDefinition = {
  id: StepId
  title: string
  description: string
  icon: typeof FileVideo2
}

const stepDefinitions: StepDefinition[] = [
  { id: "project", title: "Project Information", description: "Core metadata and positioning.", icon: Sparkles },
  { id: "video", title: "Demo Video", description: "Preview media and runtime details.", icon: FileVideo2 },
  { id: "problem", title: "Problem Solved", description: "The user problem and outcome.", icon: ListChecks },
  { id: "stack", title: "Tech Stack", description: "Tools, libraries, and focus areas.", icon: Layers3 },
  { id: "difficulty", title: "Difficulty", description: "Effort level and release stage.", icon: Rocket },
  { id: "sources", title: "Source Links", description: "External links and references.", icon: ExternalLink },
  { id: "review", title: "Review and Publish", description: "Final validation before launch.", icon: Upload },
]

const initialState: WorkflowState = {
  title: "Aurora Compose",
  slug: "aurora-compose",
  category: "Design systems",
  creator: "Maya Singh",
  description: "A polished project browser for design tokens, component states, and launch-ready previews.",
  demoVideoUrl: "",
  thumbnailUrl: "",
  videoDuration: "04:12",
  problem:
    "Teams need a clear way to present design system work as a product story instead of a static grid of cards.",
  audience: "Product designers, frontend engineers, and launch teams",
  solution:
    "A guided project page that combines a demo video, technical context, and a final publish checklist.",
  stack: "Next.js, React 19, TypeScript, Tailwind CSS",
  difficulty: "Intermediate",
  liveUrl: "",
  repoUrl: "",
  notes: "Publish-ready workflow with draft, validation, and review states.",
}

const difficultyNotes: Record<Difficulty, string> = {
  Beginner: "Simple flows with minimal dependencies and clear copy.",
  Intermediate: "Multi-step pages with state, validation, and responsive layouts.",
  Advanced: "Complex release flows with richer UI states and multiple content paths.",
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function parseStackItems(stack: string) {
  return stack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function isValidUrl(value: string) {
  return /^https?:\/\//i.test(value.trim())
}

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [state, setState] = useState(initialState)
  const [savedLabel, setSavedLabel] = useState("Draft not saved yet")
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validations = useMemo(() => {
    const stackItems = parseStackItems(state.stack)

    return {
      project: [
        { label: "Project title", ok: state.title.trim().length >= 3, hint: "Use a descriptive product name." },
        { label: "Slug", ok: slugPattern.test(state.slug.trim()), hint: "Lowercase, hyphenated, and unique." },
        { label: "Category", ok: state.category.trim().length > 0, hint: "Match the browsing taxonomy." },
        { label: "Description", ok: state.description.trim().length >= 40, hint: "Explain the value in one paragraph." },
      ],
      video: [
        { label: "Demo video URL", ok: isValidUrl(state.demoVideoUrl), hint: "Link a hosted preview or upload target." },
        { label: "Thumbnail URL", ok: isValidUrl(state.thumbnailUrl), hint: "Provide a poster image for the preview." },
        { label: "Runtime", ok: /^\d{1,2}:\d{2}$/.test(state.videoDuration.trim()), hint: "Use mm:ss or m:ss format." },
      ],
      problem: [
        { label: "Problem statement", ok: state.problem.trim().length >= 60, hint: "Describe the user pain clearly." },
        { label: "Audience", ok: state.audience.trim().length >= 10, hint: "Name the people the project serves." },
        { label: "Solution", ok: state.solution.trim().length >= 50, hint: "Explain how the project resolves it." },
      ],
      stack: [
        { label: "At least 3 tools", ok: stackItems.length >= 3, hint: "Comma-separate the technologies you used." },
        { label: "Framework included", ok: stackItems.some((item) => /next|react|vite|nuxt|svelte/i.test(item)), hint: "List the primary app framework." },
        { label: "Readable list", ok: stackItems.length === 0 || stackItems.every((item) => item.length <= 40), hint: "Keep entries concise and scannable." },
      ],
      difficulty: [
        { label: "Difficulty selected", ok: Boolean(state.difficulty), hint: "Choose the closest complexity level." },
        { label: "Notes added", ok: state.notes.trim().length >= 20, hint: "Add context for reviewers and visitors." },
      ],
      sources: [
        { label: "Live demo URL", ok: isValidUrl(state.liveUrl), hint: "Link the hosted experience." },
        { label: "Source repository", ok: isValidUrl(state.repoUrl), hint: "Link the code or a public mirror." },
      ],
      review: [],
    } satisfies Record<StepId, ValidationItem[]>
  }, [state])

  const completedSteps = stepDefinitions.filter((step) => step.id !== "review" && validations[step.id].every((item) => item.ok)).length
  const totalRequiredSteps = stepDefinitions.filter((step) => step.id !== "review").length
  const progress = Math.round((completedSteps / totalRequiredSteps) * 100)
  const activeStep = stepDefinitions[currentStep]
  const activeValidations = validations[activeStep.id]
  const isWorkflowReady = completedSteps === totalRequiredSteps
  const missingItems = stepDefinitions
    .filter((step) => step.id !== "review")
    .flatMap((step) =>
      validations[step.id]
        .filter((item) => !item.ok)
        .map((item) => `${step.title}: ${item.label}`)
    )

  const goToStep = (stepIndex: number) => {
    setCurrentStep(Math.max(0, Math.min(stepDefinitions.length - 1, stepIndex)))
  }

  const updateField = <K extends keyof WorkflowState>(field: K, value: WorkflowState[K]) => {
    setState((current) => ({ ...current, [field]: value }))
  }

  const handleSaveDraft = () => {
    setSavedLabel(`Draft saved locally at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`)
  }

  const handlePublish = async () => {
    if (!isWorkflowReady || isSubmitting) return

    setServerError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: state.title,
          slug: state.slug,
          description: state.description,
          problem: state.problem,
          stack: state.stack,
          difficulty: state.difficulty,
          demoVideoUrl: state.demoVideoUrl,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setServerError(
          payload?.error || "Unable to publish project. Please try again."
        )
        return
      }

      if (!payload?.slug) {
        setServerError("Unexpected publish response. Please try again.")
        return
      }

      router.push(`/project/${payload.slug}`)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Unable to publish project."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Upload workflow</Badge>
          <Badge variant="outline">Supabase-backed publish</Badge>
          <Badge variant="outline">Validation ready</Badge>
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.55fr)] lg:items-end">
          <div className="space-y-4">
            <h1 className="font-heading max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Build and publish a project with a guided multi-step flow.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Collect project details, validate the content, and review the final package before publishing.
              When ready, the form will submit to Supabase and redirect to the published project page.
            </p>
          </div>
          <Card className="border-foreground/10 bg-background/75 shadow-sm backdrop-blur">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Readiness</div>
                  <p className="text-sm text-muted-foreground">{completedSteps}/{totalRequiredSteps} sections complete</p>
                </div>
                <div className="text-right text-2xl font-semibold text-foreground">{progress}%</div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{isWorkflowReady ? "Ready for review and publish." : "Complete the remaining validations to unlock publishing."}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(310px,0.55fr)]">
        <Card className="border-foreground/10 bg-card shadow-sm">
          <CardContent className="space-y-6 p-5 sm:p-6">
            <div className="overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2">
                {stepDefinitions.map((step, index) => {
                  const isActive = index === currentStep
                  const isComplete = step.id !== "review" && validations[step.id].every((item) => item.ok)
                  const StepIcon = step.icon

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => goToStep(index)}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                        isActive
                          ? "border-cyan-400/40 bg-cyan-500/10 shadow-sm"
                          : "border-foreground/10 bg-background/60 hover:border-cyan-400/25 hover:bg-cyan-500/5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all",
                          isActive
                            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200"
                            : isComplete
                              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                              : "border-foreground/10 bg-muted text-muted-foreground"
                        )}
                      >
                        {isComplete && step.id !== "review" ? <CheckCircle2 className="size-4" /> : <StepIcon className="size-4" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-heading text-sm font-medium text-foreground">{step.title}</div>
                        <div className="text-xs text-muted-foreground">Step {index + 1}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="font-heading text-sm font-medium text-foreground">Current step</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentStep + 1}/{stepDefinitions.length} · {activeStep.title}
                </p>
              </div>
              <div className="sm:text-right">
                <div className="text-sm font-medium text-foreground">Saved state</div>
                <p className="mt-1 text-sm text-muted-foreground">{savedLabel}</p>
              </div>
            </div>

            {serverError ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                {serverError}
              </div>
            ) : null}
            {isSubmitting ? (
              <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-4 text-sm text-cyan-200">
                Publishing your project to Supabase...
              </div>
            ) : null}

            <div className="space-y-6">
              {activeStep.id === "project" ? (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Project title">
                      <Input value={state.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Aurora Compose" />
                    </Field>
                    <Field label="Slug">
                      <Input value={state.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="aurora-compose" />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Category">
                      <Input value={state.category} onChange={(event) => updateField("category", event.target.value)} placeholder="Design systems" />
                    </Field>
                    <Field label="Creator name">
                      <Input value={state.creator} onChange={(event) => updateField("creator", event.target.value)} placeholder="Maya Singh" />
                    </Field>
                  </div>
                  <Field label="Short description">
                    <Textarea value={state.description} onChange={(event) => updateField("description", event.target.value)} rows={5} placeholder="Describe the project, audience, and value proposition." />
                  </Field>
                </div>
              ) : null}

              {activeStep.id === "video" ? (
                <div className="grid gap-4">
                  <Field label="Demo video URL">
                    <Input value={state.demoVideoUrl} onChange={(event) => updateField("demoVideoUrl", event.target.value)} placeholder="https://videos.example.com/aurora-compose.mp4" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Thumbnail URL">
                      <Input value={state.thumbnailUrl} onChange={(event) => updateField("thumbnailUrl", event.target.value)} placeholder="https://images.example.com/preview.jpg" />
                    </Field>
                    <Field label="Runtime">
                      <Input value={state.videoDuration} onChange={(event) => updateField("videoDuration", event.target.value)} placeholder="04:12" />
                    </Field>
                  </div>
                  <div className="rounded-2xl border border-dashed border-foreground/15 bg-background/70 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileVideo2 className="size-4 text-cyan-300" />
                      Video preview shell
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Upload and preview a hero demo with a prominent frame, caption, and runtime metadata.
                    </p>
                  </div>
                </div>
              ) : null}

              {activeStep.id === "problem" ? (
                <div className="grid gap-4">
                  <Field label="Problem statement">
                    <Textarea value={state.problem} onChange={(event) => updateField("problem", event.target.value)} rows={5} placeholder="What problem does this solve?" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Target audience">
                      <Input value={state.audience} onChange={(event) => updateField("audience", event.target.value)} placeholder="Frontend teams and designers" />
                    </Field>
                    <Field label="Outcome">
                      <Input value={state.solution} onChange={(event) => updateField("solution", event.target.value)} placeholder="What changes after using it?" />
                    </Field>
                  </div>
                </div>
              ) : null}

              {activeStep.id === "stack" ? (
                <div className="grid gap-4">
                  <Field label="Tech stack">
                    <Textarea value={state.stack} onChange={(event) => updateField("stack", event.target.value)} rows={4} placeholder="Next.js, React 19, TypeScript, Tailwind CSS" />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {parseStackItems(state.stack).map((item) => (
                      <Badge key={item} variant="secondary" className="justify-center py-2 text-center">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeStep.id === "difficulty" ? (
                <div className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((difficulty) => {
                      const selected = state.difficulty === difficulty

                      return (
                        <button
                          key={difficulty}
                          type="button"
                          onClick={() => updateField("difficulty", difficulty)}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition-all duration-200",
                            selected
                              ? "border-cyan-400/40 bg-cyan-500/10 shadow-sm"
                              : "border-foreground/10 bg-background/60 hover:border-cyan-400/25 hover:bg-cyan-500/5"
                          )}
                        >
                          <div className="text-sm font-medium text-foreground">{difficulty}</div>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{difficultyNotes[difficulty]}</p>
                        </button>
                      )
                    })}
                  </div>
                  <Field label="Release notes">
                    <Textarea value={state.notes} onChange={(event) => updateField("notes", event.target.value)} rows={4} placeholder="Add reviewer context, release notes, or setup details." />
                  </Field>
                </div>
              ) : null}

              {activeStep.id === "sources" ? (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Live demo URL">
                      <Input value={state.liveUrl} onChange={(event) => updateField("liveUrl", event.target.value)} placeholder="https://example.com/projects/aurora-compose" />
                    </Field>
                    <Field label="Source repository">
                      <Input value={state.repoUrl} onChange={(event) => updateField("repoUrl", event.target.value)} placeholder="https://github.com/example/aurora-compose" />
                    </Field>
                  </div>
                  <Field label="Supporting notes">
                    <Textarea value={state.notes} onChange={(event) => updateField("notes", event.target.value)} rows={4} placeholder="Mention any design notes, docs, or other reference links." />
                  </Field>
                </div>
              ) : null}

              {activeStep.id === "review" ? (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="border-foreground/10 bg-background/60">
                      <CardContent className="space-y-2 p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Project</div>
                        <div className="text-sm font-medium text-foreground">{state.title}</div>
                        <p className="text-sm text-muted-foreground">/{state.slug}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-foreground/10 bg-background/60">
                      <CardContent className="space-y-2 p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Publish mode</div>
                        <div className="text-sm font-medium text-foreground">Database-backed publish</div>
                        <p className="text-sm text-muted-foreground">Submissions are sent to Supabase and rendered from the published project route.</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="rounded-2xl border border-foreground/10 bg-background/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-300" />
                      Publish checklist
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Review the validation states on the right, then publish when every required section is ready.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <Card className="border-foreground/10 bg-background/70">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading text-sm font-medium text-foreground">Step validation</div>
                    <p className="text-sm text-muted-foreground">{activeStep.description}</p>
                  </div>
                  <Badge variant={activeValidations.every((item) => item.ok) ? "secondary" : "outline"}>
                    {activeValidations.every((item) => item.ok) ? "Ready" : "Needs input"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {activeValidations.length > 0 ? (
                    activeValidations.map((item) => {
                      const Icon = item.ok ? CheckCircle2 : AlertCircle

                      return (
                        <div key={item.label} className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card/50 p-3">
                          <Icon className={cn("mt-0.5 size-4", item.ok ? "text-emerald-300" : "text-amber-300")} />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground">{item.label}</div>
                            <p className="text-sm text-muted-foreground">{item.hint}</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="rounded-xl border border-dashed border-foreground/15 bg-background/60 p-3 text-sm text-muted-foreground">
                      This final step only confirms that the previous sections are complete.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-4">
              <Button variant="outline" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0}>
                <ChevronLeft className="size-4" />
                Back
              </Button>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={handleSaveDraft}>
                  Save draft
                </Button>
                {currentStep < stepDefinitions.length - 1 ? (
                  <Button onClick={() => goToStep(currentStep + 1)}>
                    Continue
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={handlePublish} disabled={!isWorkflowReady || isSubmitting}>
                    {isSubmitting ? "Publishing..." : isWorkflowReady ? "Publish project" : "Resolve validation"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-foreground/10 bg-card shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <div className="font-heading text-sm font-medium text-foreground">Progress overview</div>
                <p className="mt-1 text-sm text-muted-foreground">Track what is complete and what still blocks publishing.</p>
              </div>
              <div className="space-y-2">
                {stepDefinitions.map((step, index) => {
                  const stepReady = step.id !== "review" && validations[step.id].every((item) => item.ok)
                  const isActive = index === currentStep
                  const StepIcon = step.icon

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => goToStep(index)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-200",
                        isActive
                          ? "border-cyan-400/35 bg-cyan-500/10"
                          : "border-foreground/10 bg-background/60 hover:border-cyan-400/25 hover:bg-cyan-500/5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-9 items-center justify-center rounded-xl border",
                          stepReady ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" : "border-foreground/10 bg-muted text-muted-foreground"
                        )}
                      >
                        {stepReady ? <CheckCircle2 className="size-4" /> : <StepIcon className="size-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground">{step.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{step.description}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{index + 1}</div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-card shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <AlertCircle className="size-4 text-amber-300" />
                Validation summary
              </div>
              <div className="space-y-2">
                {missingItems.length > 0 ? (
                  missingItems.slice(0, 6).map((item) => (
                    <div key={item} className="rounded-xl border border-foreground/10 bg-background/60 p-3 text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/8 p-3 text-sm text-emerald-200">
                    Everything required to publish is complete.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-foreground/10 bg-card shadow-sm">
            <CardContent className="space-y-3 p-5">
              <div className="font-heading text-sm font-medium text-foreground">Quick facts</div>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4">
                  <span>Difficulty</span>
                  <span className="text-foreground">{state.difficulty}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Stack items</span>
                  <span className="text-foreground">{parseStackItems(state.stack).length}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Step</span>
                  <span className="text-foreground">{activeStep.title}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Publish state</span>
                  <span className="text-foreground">{isSubmitting ? "Publishing..." : "Ready to publish"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
    </label>
  )
}