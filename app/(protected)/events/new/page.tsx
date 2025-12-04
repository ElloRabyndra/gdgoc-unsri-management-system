"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    form,
    members,
    filteredMembers,
    selectedCommittee,
    committeeSearch,
    setCommitteeSearch,
    toggleCommitteeMember,
  } = useEventForm();

  const handleSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simpan ke sessionStorage untuk diambil di halaman events
    sessionStorage.setItem("newEvent", JSON.stringify(data));

    toast.success("Event added successfully!");
    router.push("/events");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <EventFormHeader
        title="Add New Event"
        description="Create a new event for GDGoC UNSRI"
        onBack={() => router.push("/events")}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <EventDetailsForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/events")}
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
