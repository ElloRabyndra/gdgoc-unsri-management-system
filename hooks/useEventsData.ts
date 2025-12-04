import { useState, useMemo } from "react";
import { dummyEvents } from "@/lib/dummy-events";
import { type Event } from "@/types";
import { toast } from "sonner";

export function useEventsData() {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType = typeFilter === "all" || event.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [events, typeFilter, statusFilter]);

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event deleted successfully!");
  };

  return {
    events,
    filteredEvents,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    deleteEvent,
  };
}