"use client";

import { Calendar, Loader2 } from "lucide-react";
import { AttendancePageHeader } from "@/components/attendance/AttendancePageHeader";
import { AttendanceMobileView } from "@/components/attendance/AttendanceMobileView";
import { AttendanceDesktopView } from "@/components/attendance/AttendanceDesktopView";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAttendance } from "@/hooks/useAttendance";
import { useIsMobile } from "@/hooks/useMobile";

const MAX_EVENTS_FOR_TABLE = 6;

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
    isLoadingData,
    toggleAttendance,
    isPresent,
    getMemberAttendanceStats,
    handleCreateEvent,
  } = useAttendance();

  // Use compact view when mobile OR events > 6
  const useCompactView = isMobile || events.length > MAX_EVENTS_FOR_TABLE;

  // Loading state
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <AttendancePageHeader />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading attendance data...
            </p>
          </div>
        </div>
      </div>
    );
  }

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

  // Compact view (mobile or > 6 events)
  if (useCompactView) {
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

  // Desktop table view (≤6 events)
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
