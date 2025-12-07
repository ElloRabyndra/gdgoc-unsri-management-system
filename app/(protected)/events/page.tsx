"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { EventsPageHeader } from "@/components/event/EventsPageHeader";
import { EventsFilters } from "@/components/event/EventsFilters";
import { EventsGrid } from "@/components/event/EventsGrid";
import { EventDetail } from "@/components/event/EventDetail";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useEvents } from "@/hooks/useEvents";
import { type Member } from "@/types";
import { Loader2 } from "lucide-react";

export default function Events() {
  const {
    events,
    filteredEvents,
    isLoadingData,
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

  const [members, setMembers] = useState<Member[]>([]);

  // Fetch members for event detail
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = collection(db, "members");
        const querySnapshot = await getDocs(membersRef);
        const membersData: Member[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            division: data.division,
            role: data.role,
            status: data.status,
            joinDate: data.joinDate.toDate(),
          };
        });
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Loading state
  if (isLoadingData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

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
        members={members}
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
