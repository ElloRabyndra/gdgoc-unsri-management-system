import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { dummyEvents } from "@/lib/dummy-events";
import { type Event } from "@/types";
import { toast } from "sonner";

export function useEvents() {
  const router = useRouter();

  // Data state
  const [events, setEvents] = useState<Event[]>(dummyEvents);

  // Filter state
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // UI state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType = typeFilter === "all" || event.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [events, typeFilter, statusFilter]);

  // CRUD operations
  const addEvent = (eventData: any) => {
    const newEvent: Event = {
      id: String(Date.now()),
      ...eventData,
    };
    setEvents((prev) => [...prev, newEvent]);
    toast.success("Event added successfully!");
  };

  const updateEvent = (id: string, eventData: any) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...eventData } : e))
    );
    toast.success("Event updated successfully!");
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event deleted successfully!");
  };

  // Navigation handlers
  const handleAddEvent = () => {
    router.push("/events/new");
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      router.push(`/events/edit/${selectedEvent.id}`);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setDeletingEvent(selectedEvent);
      setSelectedEvent(null);
    }
  };

  // Dialog handlers
  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;
    deleteEvent(deletingEvent.id);
    setDeletingEvent(null);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleDetailClose = () => {
    setSelectedEvent(null);
  };

  const handleDeleteDialogClose = () => {
    setDeletingEvent(null);
  };

  // Get event by ID (untuk edit page)
  const getEventById = (id: string): Event | undefined => {
    return events.find((e) => e.id === id);
  };

  return {
    // Data
    events,
    filteredEvents,
    selectedEvent,
    deletingEvent,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    addEvent,
    updateEvent,
    deleteEvent,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleConfirmDelete,
    handleEventClick,
    handleDetailClose,
    handleDeleteDialogClose,
    getEventById,
  };
}
