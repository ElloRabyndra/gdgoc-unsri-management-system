"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventsPageHeader } from "@/components/event/EventsPageHeader";
import { EventsFilters } from "@/components/event/EventsFilters";
import { EventsGrid } from "@/components/event/EventsGrid";
import { EventDetail } from "@/components/event/EventDetail";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { dummyMembers } from "@/lib/dummy-members";
import { useEventsData } from "@/hooks/useEventsData";
import { type Event } from "@/types";

export default function Events() {
  const router = useRouter();
  const {
    events,
    filteredEvents,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    deleteEvent,
  } = useEventsData();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  const handleAddEvent = () => {
    router.push("/events/new");
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      // Simpan ke sessionStorage untuk diakses di form
      sessionStorage.setItem("editEvent", JSON.stringify(selectedEvent));
      router.push(`/events/edit/${selectedEvent.id}`);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setDeletingEvent(selectedEvent);
      setSelectedEvent(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;

    deleteEvent(deletingEvent.id);
    setDeletingEvent(null);
  };

  return (
    <div className="space-y-6">
      <EventsPageHeader onAddEvent={handleAddEvent} />

      <EventsFilters
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <EventsGrid
        events={events}
        filteredEvents={filteredEvents}
        onEventClick={setSelectedEvent}
        onAddEvent={handleAddEvent}
      />

      <EventDetail
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
        event={selectedEvent}
        members={dummyMembers}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <ConfirmDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        title="Delete Event"
        description={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        variant="destructive"
      />
    </div>
  );
}
