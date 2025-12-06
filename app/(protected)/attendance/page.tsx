"use client";

import { Calendar } from "lucide-react";
import { AttendancePageHeader } from "@/components/attendance/AttendancePageHeader";
import { AttendanceMobileView } from "@/components/attendance/AttendanceMobileView";
import { AttendanceDesktopView } from "@/components/attendance/AttendanceDesktopView";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAttendance } from "@/hooks/useAttendance";
import { useIsMobile } from "@/hooks/useMobile";

export default function AttendancePage() {
  const isMobile = useIsMobile();
  const {
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
  } = useAttendance();

  // Empty state
  if (events.length === 0) {
    return (
      <div className="space-y-6">
        <AttendancePageHeader />
        <EmptyState
          icon={Calendar}
          title="No events available"
          description="Create your first event to start tracking attendance"
          actionLabel="Create Event"
          onAction={handleCreateEvent}
        />
      </div>
    );
  }

  // Mobile view
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

  // Desktop view
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
