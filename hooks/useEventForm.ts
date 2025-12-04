import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dummyMembers } from "@/lib/dummy-members";
import { type Event } from "@/types";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  date: z.date(),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required").max(1000),
  committee: z.array(z.string()),
});

export type EventFormValues = z.infer<typeof eventSchema>;

interface UseEventFormProps {
  event?: Event | null;
}

export function useEventForm({ event }: UseEventFormProps = {}) {
  const [committeeSearch, setCommitteeSearch] = useState("");
  const members = dummyMembers;

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      date: event?.date || new Date(),
      type: event?.type || "",
      status: event?.status || "",
      description: event?.description || "",
      committee: event?.committee || [],
    },
  });

  const selectedCommittee = form.watch("committee");

  const filteredMembers = useMemo(() => {
    if (!committeeSearch.trim()) return members;
    const search = committeeSearch.toLowerCase();
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        member.division.toLowerCase().includes(search)
    );
  }, [members, committeeSearch]);

  const toggleCommitteeMember = (memberId: string) => {
    const current = form.getValues("committee");
    if (current.includes(memberId)) {
      form.setValue(
        "committee",
        current.filter((id) => id !== memberId)
      );
    } else {
      form.setValue("committee", [...current, memberId]);
    }
  };

  return {
    form,
    members,
    filteredMembers,
    selectedCommittee,
    committeeSearch,
    setCommitteeSearch,
    toggleCommitteeMember,
  };
}