"use client";

import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";
import { useEvents } from "@/hooks/useEvents";
import { Loader2 } from "lucide-react";

export default function NewEventPage() {
  const { addEvent } = useEvents();

  const handleSubmit = async (data: EventFormValues) => {
    await addEvent(data);
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
  } = useEventForm({ onSubmit: handleSubmit });

  // Loading state for members
  if (isLoadingMembers) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

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
