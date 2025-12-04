"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { AttendancePageHeader } from "@/components/attendance/AttendancePageHeader";
import { AttendanceMobileView } from "@/components/attendance/AttendanceMobileView";
import { AttendanceDesktopView } from "@/components/attendance/AttendanceDesktopView";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAttendanceData } from "@/hooks/useAttendanceData";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AttendancePage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const {
    events,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    searchQuery,
    setSearchQuery,
    filteredMembers,
    toggleAttendance,
    isPresent,
    getMemberAttendanceStats,
  } = useAttendanceData();

  if (events.length === 0) {
    return (
      <div className="space-y-6">
        <AttendancePageHeader />
        <EmptyState
          icon={Calendar}
          title="No events available"
          description="Create your first event to start tracking attendance"
          actionLabel="Create Event"
          onAction={() => router.push("/events")}
        />
      </div>
    );
  }

  // Mobile View - Event selector + member list
  if (isMobile) {
    return (
      <div className="space-y-6">
        <AttendancePageHeader />
        <AttendanceMobileView
          selectedEventId={selectedEventId}
          onEventChange={setSelectedEventId}
          events={events}
          selectedEvent={selectedEvent}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredMembers={filteredMembers}
          isPresent={isPresent}
          toggleAttendance={toggleAttendance}
          getMemberAttendanceStats={getMemberAttendanceStats}
        />
      </div>
    );
  }

  // Desktop View - Full table
  return (
    <div className="space-y-6">
      <AttendancePageHeader />
      <AttendanceDesktopView
        events={events}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredMembers={filteredMembers}
        isPresent={isPresent}
        toggleAttendance={toggleAttendance}
        getMemberAttendanceStats={getMemberAttendanceStats}
      />
    </div>
  );
}
