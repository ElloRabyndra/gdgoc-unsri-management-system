"use client";

import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MembersByDivisionChart } from "@/components/dashboard/MembersByDivisionChart";
import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {
  const { members, stats, isLoadingData } = useDashboard();

  // Loading state
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <MembersByDivisionChart members={members} />
    </div>
  );
}
