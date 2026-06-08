"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FilterBarProps = {
  filters: string[]
}

export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <Tabs defaultValue={filters[0]} className="w-full overflow-x-auto">
        <TabsList variant="line" className="w-full flex-wrap justify-start gap-2">
          {filters.map((filter) => (
            <TabsTrigger key={filter} value={filter} className="rounded-full px-3 py-1.5">
              {filter}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Refine feed" className="h-10 rounded-full pl-9" />
      </div>
    </div>
  )
}