"use client";
import { useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MembersByDivisionChart } from "@/components/dashboard/MembersByDivisionChart";
import { dummyMembers } from "@/lib/dummy-members";
import { dummyEvents } from "@/lib/dummy-events";

export default function Dashboard() {
  const stats = useMemo(() => {
    const totalMembers = dummyMembers.length;
    const totalEvents = dummyEvents.length;
    const upcomingEvents = dummyEvents.filter(
      (e) => e.status === "On Going" || e.status === "Pending"
    ).length;
    const activeMembers = dummyMembers.filter(
      (m) => m.status === "Active"
    ).length;

    return { totalMembers, totalEvents, upcomingEvents, activeMembers };
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <MembersByDivisionChart members={dummyMembers} />
    </div>
  );
}
