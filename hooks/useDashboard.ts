import { useMemo } from "react";
import { useMembers, useEvents } from "@/hooks/useFirebaseQueries";

export function useDashboard() {
  // etch data menggunakan React Query
  const { data: members = [], isLoading: isLoadingMembers } = useMembers();
  const { data: events = [], isLoading: isLoadingEvents } = useEvents();

  // Loading state gabungan
  const isLoadingData = isLoadingMembers || isLoadingEvents;

  // Filter members (exclude "No Division") and role is member
  const membersWithDivision = useMemo(() => {
    return members.filter((m) => (m.division !== "No Division" && m.role === "Member"));
  }, [members]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalMembers = membersWithDivision.length;
    const totalEvents = events.length;

    const upcomingEvents = events.filter((e) => {
      const status = e.status.toLowerCase();
      return (
        status === "upcoming" || status === "ongoing" || status === "pending"
      );
    }).length;

    // Count active members (case-insensitive)
    const activeMembers = membersWithDivision.filter((m) => {
      return m.status.toLowerCase() === "active";
    }).length;

    return { totalMembers, totalEvents, upcomingEvents, activeMembers };
  }, [membersWithDivision, events]);

  return {
    members: membersWithDivision,
    events,
    stats,
    isLoadingData,
  };
}