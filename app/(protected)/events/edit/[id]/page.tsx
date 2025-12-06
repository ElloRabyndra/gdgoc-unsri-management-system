"use client";

import { useParams, useRouter } from "next/navigation";
import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";
import { useEvents } from "@/hooks/useEvents";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const { getEventById, updateEvent } = useEvents();
  const event = getEventById(eventId);

  // Redirect jika event tidak ditemukan
  if (!event) {
    router.push("/events");
    return null;
  }

  const handleSubmit = async (data: EventFormValues) => {
    updateEvent(eventId, data);
  };

  const {
    form,
    isLoading,
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

  return (
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
  );
}
