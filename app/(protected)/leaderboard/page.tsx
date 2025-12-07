"use client";

import { Users, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { useLeaderboard } from "@/hooks/useLeaderboard";

import { EmptyState } from "@/components/shared/EmptyState";
import { LeaderboardFilters } from "@/components/leaderboard/LeaderboardFilters";
import { LeaderboardCard } from "@/components/leaderboard/LeaderboardCard";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  const isMobile = useIsMobile();
  const {
    members,
    isLoadingData,
    searchQuery,
    setSearchQuery,
    divisionFilter,
    setDivisionFilter,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    updatePoints,
  } = useLeaderboard();

  // Loading state
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track member points and rankings
          </p>
        </div>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track member points and rankings
        </p>
      </div>

      <LeaderboardFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        divisionFilter={divisionFilter}
        onDivisionChange={setDivisionFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No members found"
          description="Try adjusting your search or filters"
        />
      ) : isMobile ? (
        <div className="grid gap-3">
          {members.map((member, index) => (
            <LeaderboardCard
              key={member.id}
              member={member}
              rank={index + 1}
              onUpdatePoints={updatePoints}
            />
          ))}
        </div>
      ) : (
        <LeaderboardTable members={members} onUpdatePoints={updatePoints} />
      )}
    </div>
  );
}