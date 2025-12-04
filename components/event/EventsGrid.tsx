import { Calendar } from "lucide-react";
import { EventCard } from "@/components/event/EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { type Event } from "@/types";

interface EventsGridProps {
  events: Event[];
  filteredEvents: Event[];
  onEventClick: (event: Event) => void;
  onAddEvent: () => void;
}

export function EventsGrid({
  events,
  filteredEvents,
  onEventClick,
  onAddEvent,
}: EventsGridProps) {
  if (filteredEvents.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No events found"
        description={
          events.length === 0
            ? "Get started by creating your first event"
            : "Try adjusting your filters"
        }
        actionLabel={events.length === 0 ? "Add Event" : undefined}
        onAction={events.length === 0 ? onAddEvent : undefined}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
}