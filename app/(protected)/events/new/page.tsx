"use client";

import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";
import { useEvents } from "@/hooks/useEvents";

export default function NewEventPage() {
  const { addEvent } = useEvents();

  const handleSubmit = async (data: EventFormValues) => {
    addEvent(data);
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
  } = useEventForm({ onSubmit: handleSubmit });

  return (
    <div className="space-y-6 animate-fade-in">
      <EventFormHeader
        title="Add New Event"
        description="Create a new event for GDGoC UNSRI"
        onBack={handleBack}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <EventDetailsForm
          form={form}
          onSubmit={onSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          isEdit={false}
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
