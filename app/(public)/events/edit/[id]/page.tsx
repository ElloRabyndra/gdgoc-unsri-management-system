"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useParams, useRouter } from "next/navigation";
import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";
import { useEvents } from "@/hooks/useEvents";
import { Loader2 } from "lucide-react";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const { getEventById, updateEvent, isLoadingData } = useEvents();
  const event = getEventById(eventId);

  const handleSubmit = async (data: EventFormValues) => {
    await updateEvent(eventId, data);
  };

  const {
    form,
    isLoading,
    isLoadingMembers,
    members,
    filteredMembers,
    selectedCommittee,
    committeeSearch,
    setCommitteeSearch,
    toggleCommitteeMember,
    handleSubmit: onSubmit,
    handleCancel,
    handleBack,
  } = useEventForm({ event, onSubmit: handleSubmit });

  // Loading state
  if (isLoadingData || isLoadingMembers) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading event...</p>
        </div>
      </div>
    );
  }

  // Redirect jika event tidak ditemukan
  if (!event) {
    router.push("/events");
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <EventFormHeader
          title="Edit Event"
          description="Update event details for GDGoC UNSRI"
          onBack={handleBack}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <EventDetailsForm
            form={form}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            isEdit={true}
          />

          <CommitteePanel
            selectedMemberIds={selectedCommittee}
            allMembers={members}
            filteredMembers={filteredMembers}
            searchValue={committeeSearch}
            onSearchChange={setCommitteeSearch}
            onToggleMember={toggleCommitteeMember}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
