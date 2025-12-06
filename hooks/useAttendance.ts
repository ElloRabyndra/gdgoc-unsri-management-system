import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { dummyMembers } from "@/lib/dummy-members";
import { dummyEvents } from "@/lib/dummy-events";
import { dummyAttendance } from "@/lib/dummy-attendance";
import { type Attendance } from "@/types";
import { toast } from "sonner";

export function useAttendance() {
  const router = useRouter();

  // Data state
  const [attendance, setAttendance] = useState<Attendance[]>(dummyAttendance);
  const events = dummyEvents;

  // UI state
  const [selectedEventId, setSelectedEventId] = useState<string>(
    events[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered members
  const filteredMembers = useMemo(() => {
    return dummyMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Selected event
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Attendance operations
  const toggleAttendance = (memberId: string, eventId: string) => {
    setAttendance((prev) => {
      const existing = prev.find(
        (a) => a.memberId === memberId && a.eventId === eventId
      );
      if (existing) {
        return prev.map((a) =>
          a.memberId === memberId && a.eventId === eventId
            ? { ...a, present: !a.present }
            : a
        );
      } else {
        return [...prev, { memberId, eventId, present: true }];
      }
    });
    toast.success("Attendance updated");
  };

  const isPresent = (memberId: string, eventId: string) => {
    const record = attendance.find(
      (a) => a.memberId === memberId && a.eventId === eventId
    );
    return record?.present || false;
  };

  const getMemberAttendanceStats = (memberId: string) => {
    const memberAttendance = attendance.filter((a) => a.memberId === memberId);
    const presentCount = memberAttendance.filter((a) => a.present).length;
    const totalEvents = events.length;
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
    filteredMembers,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    searchQuery,
    setSearchQuery,
    toggleAttendance,
    isPresent,
    getMemberAttendanceStats,
    handleCreateEvent,
  };
}
