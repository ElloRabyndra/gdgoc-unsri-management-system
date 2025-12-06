import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { type Event } from "@/types";
import { toast } from "sonner";

export function useEvents() {
  const router = useRouter();

  // Data state
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Filter state
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // UI state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      setIsLoadingData(true);
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      const eventsData: Event[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          date:
            data.date instanceof Timestamp
              ? data.date.toDate()
              : new Date(data.date),
          type: data.type,
          status: data.status,
          description: data.description,
          committee: data.committee || [],
        };
      });

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchEvents();
  }, []);

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
  const addEvent = async (eventData: any) => {
    try {
      const eventsRef = collection(db, "events");
      const newEventData = {
        title: eventData.title,
        date: Timestamp.fromDate(eventData.date),
        type: eventData.type,
        status: eventData.status,
        description: eventData.description,
        committee: eventData.committee || [],
      };

      await addDoc(eventsRef, newEventData);
      toast.success("Event added successfully!");

      // Refresh data
      await fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
      throw error;
    }
  };

  const updateEvent = async (id: string, eventData: any) => {
    try {
      const eventRef = doc(db, "events", id);
      const updateData = {
        title: eventData.title,
        date: Timestamp.fromDate(eventData.date),
        type: eventData.type,
        status: eventData.status,
        description: eventData.description,
        committee: eventData.committee || [],
      };

      await updateDoc(eventRef, updateData);
      toast.success("Event updated successfully!");

      // Refresh data
      await fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      // Hapus event
      const eventRef = doc(db, "events", id);
      await deleteDoc(eventRef);

      // Hapus semua attendance yang terkait dengan event ini
      const attendanceRef = collection(db, "attendance");
      const q = query(attendanceRef, where("eventId", "==", id));
      const attendanceSnapshot = await getDocs(q);

      // Hapus semua attendance records
      const deletePromises = attendanceSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      toast.success("Event deleted successfully!");

      // Refresh data
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
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
    await deleteEvent(deletingEvent.id);
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
    isLoadingData,
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
