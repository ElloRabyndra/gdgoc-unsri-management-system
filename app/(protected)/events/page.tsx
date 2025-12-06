"use client";

import { EventsPageHeader } from "@/components/event/EventsPageHeader";
import { EventsFilters } from "@/components/event/EventsFilters";
import { EventsGrid } from "@/components/event/EventsGrid";
import { EventDetail } from "@/components/event/EventDetail";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { dummyMembers } from "@/lib/dummy-members";
import { useEvents } from "@/hooks/useEvents";

export default function Events() {
  const {
    events,
    filteredEvents,
    selectedEvent,
    deletingEvent,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleConfirmDelete,
    handleEventClick,
    handleDetailClose,
    handleDeleteDialogClose,
  } = useEvents();

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
        onEventClick={handleEventClick}
        onAddEvent={handleAddEvent}
      />

      <EventDetail
        open={!!selectedEvent}
        onOpenChange={(open) => !open && handleDetailClose()}
        event={selectedEvent}
        members={dummyMembers}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <ConfirmDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && handleDeleteDialogClose()}
        title="Delete Event"
        description={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        variant="destructive"
      />
    </div>
  );
}