import { Users, Calendar, CalendarCheck, UserCheck } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

interface DashboardStatsProps {
  stats: {
    totalMembers: number;
    totalEvents: number;
    upcomingEvents: number;
    activeMembers: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Members"
        value={stats.totalMembers}
        icon={Users}
        iconColor="blue"
      />
      <StatCard
        title="Total Events"
        value={stats.totalEvents}
        icon={Calendar}
        iconColor="red"
      />
      <StatCard
        title="Upcoming Events"
        value={stats.upcomingEvents}
        icon={CalendarCheck}
        iconColor="yellow"
      />
      <StatCard
        title="Active Members"
        value={stats.activeMembers}
        icon={UserCheck}
        iconColor="green"
      />
    </div>
  );
}
