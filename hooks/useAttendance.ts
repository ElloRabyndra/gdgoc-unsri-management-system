import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useMembers,
  useEvents,
  useAttendance as useAttendanceQuery,
  useToggleAttendance,
} from "@/hooks/useFirebaseQueries";
import { useRequireAuth } from "./useRequireAuth";

export function useAttendance() {
  const { requireAuth } = useRequireAuth();
  const router = useRouter();

  // Fetch data dari tiga sumber dengan React Query
  const { data: events = [], isLoading: isLoadingEvents } = useEvents();
  const { data: members = [], isLoading: isLoadingMembers } = useMembers();
  const { data: attendance = [], isLoading: isLoadingAttendance } =
    useAttendanceQuery();

  // Mutation hook
  const toggleAttendanceMutation = useToggleAttendance();

  // UI state
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Set selected event ke event pertama jika belum ada
  useEffect(() => {
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  // Loading state gabungan
  const isLoadingData =
    isLoadingEvents || isLoadingMembers || isLoadingAttendance;

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  // Selected event
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Toggle attendance menggunakan mutation hook
  const toggleAttendance = async (memberId: string, eventId: string) => {
    if (!requireAuth()) return;
    try {
      await toggleAttendanceMutation.mutateAsync({
        memberId,
        eventId,
        attendance,
      });
    } catch (error) {
      // Error sudah di-handle di mutation hook
      console.error(error);
    }
  };

  // Helper functions
  const isPresent = (memberId: string, eventId: string) => {
    const record = attendance.find(
      (a) => a.memberId === memberId && a.eventId === eventId
    );
    return record?.present || false;
  };

  const getMemberAttendanceStats = (memberId: string) => {
    // Filter hanya attendance untuk event yang masih ada
    const validEventIds = new Set(events.map((e) => e.id));

    const validAttendance = attendance.filter((a) =>
      validEventIds.has(a.eventId)
    );

    // Hitung jumlah event di mana member hadir (present: true)
    const presentCount = validAttendance.filter(
      (a) => a.memberId === memberId && a.present === true
    ).length;

    // Total events yang ada
    const totalEvents = events.length;

    // Hitung persentase
    const percentage =
      totalEvents > 0 ? Math.round((presentCount / totalEvents) * 100) : 0;

    return { presentCount, totalEvents, percentage };
  };

  // Navigation handler
  const handleCreateEvent = () => {
    router.push("/events");
  };

  return {
    events,
    members,
    filteredMembers,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    searchQuery,
    setSearchQuery,
    isLoadingData,
    toggleAttendance,
    isPresent,
    getMemberAttendanceStats,
    handleCreateEvent,
  };
}
