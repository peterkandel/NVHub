import { FeedGrid } from "@/components/feed-grid"
import { feedFilters, mockProjects } from "@/lib/mock-data"

export default function Home() {
  return (
    <FeedGrid projects={mockProjects} filters={feedFilters} />
  );
}
