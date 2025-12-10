import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useEvents as useEventsQuery,
  useAddEvent,
  useUpdateEvent,
  useDeleteEvent,
} from "@/hooks/useFirebaseQueries";
import { type Event } from "@/types";

export function useEvents() {
  const router = useRouter();

  // Data fetching menggunakan React Query
  const { data: events = [], isLoading: isLoadingData, error } = useEventsQuery();

  // Mutation hooks
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  // Filter state
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  //  UI state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType = typeFilter === "all" || event.type === typeFilter;
      const matchesStatus = statusFilter === "all" || event.status === statusFilter;
      return matchesType && matchesStatus;
    });
  }, [events, typeFilter, statusFilter]);

  // CRUD operations menggunakan mutation hooks
  const addEvent = async (eventData: any) => {
    try {
      await addEventMutation.mutateAsync(eventData);
    } catch (error) {
      // Error sudah di-handle di mutation hook (toast)
      console.error(error);
      throw error;
    }
  };

  const updateEvent = async (id: string, eventData: any) => {
    try {
      await updateEventMutation.mutateAsync({ id, data: eventData });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteEventMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
    try {
      await deleteEvent(deletingEvent.id);
      setDeletingEvent(null);
    } catch (error) {
      // Error sudah di-handle
      console.error(error);
    }
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

  // Return value
  return {
    events,
    filteredEvents,
    isLoadingData,
    error,
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