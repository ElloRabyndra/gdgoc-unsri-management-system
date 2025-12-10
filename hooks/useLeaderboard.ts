"use client";

import { useState, useMemo } from "react";
import {
  useLeaderboard as useLeaderboardQuery,
  useUpdatePoints,
} from "@/hooks/useFirebaseQueries";
import { Division, MemberStatus, SortOrder } from "@/types";
import { useRequireAuth } from "./useRequireAuth";

export function useLeaderboard() {
  const { requireAuth } = useRequireAuth();
  const {
    data: members = [],
    isLoading: isLoadingData,
    error,
  } = useLeaderboardQuery();

  // Mutation hook
  const updatePointsMutation = useUpdatePoints();

  // Filter dan sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<Division | "all">("all");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("high-low");

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let result = [...members];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
      );
    }

    if (divisionFilter !== "all") {
      result = result.filter((member) => member.division === divisionFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortOrder === "high-low") {
        return b.points - a.points;
      }
      return a.points - b.points;
    });

    return result;
  }, [members, searchQuery, divisionFilter, statusFilter, sortOrder]);

  // Update points menggunakan mutation hook
  const updatePoints = async (memberId: string, pointsChange: number) => {
    if (!requireAuth()) return;
    try {
      // Find current member
      const member = members.find((m) => m.id === memberId);
      if (!member) return;

      const newPoints = Math.max(0, member.points + pointsChange);

      // Gunakan mutation hook
      await updatePointsMutation.mutateAsync({ memberId, newPoints });
    } catch (error) {
      // Error sudah di-handle di mutation hook
      console.error(error);
    }
  };

  // Return value
  return {
    members: filteredMembers,
    isLoadingData,
    error,
    searchQuery,
    setSearchQuery,
    divisionFilter,
    setDivisionFilter,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    updatePoints,
  };
}
