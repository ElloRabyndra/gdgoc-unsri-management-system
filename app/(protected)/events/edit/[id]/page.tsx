"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { EventFormHeader } from "@/components/event/EventFormHeader";
import { EventDetailsForm } from "@/components/event/EventDetailsForm";
import { CommitteePanel } from "@/components/event/CommitteePanel";
import { useEventForm, type EventFormValues } from "@/hooks/useEventForm";
import { dummyEvents } from "@/lib/dummy-events";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  // Ambil event dari dummy data berdasarkan ID
  const event = dummyEvents.find((e) => e.id === eventId);

  // Redirect jika event tidak ditemukan
  if (!event) {
    router.push("/events");
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);

  const {
    form,
    members,
    filteredMembers,
    selectedCommittee,
    committeeSearch,
    setCommitteeSearch,
    toggleCommitteeMember,
  } = useEventForm({ event });

  const handleSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simpan update ke sessionStorage
    sessionStorage.setItem(
      "editEvent",
      JSON.stringify({ ...data, id: eventId })
    );

    toast.success("Event updated successfully!");
    router.push("/events");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <EventFormHeader
        title="Edit Event"
        description="Update event details for GDGoC UNSRI"
        onBack={() => router.push("/events")}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <EventDetailsForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/events")}
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
