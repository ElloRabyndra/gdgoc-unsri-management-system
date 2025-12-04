import { format } from "date-fns";
import { CheckSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event, type Member } from "@/types";

interface AttendanceDesktopViewProps {
  events: Event[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredMembers: Member[];
  isPresent: (memberId: string, eventId: string) => boolean;
  toggleAttendance: (memberId: string, eventId: string) => void;
  getMemberAttendanceStats: (memberId: string) => {
    presentCount: number;
    totalEvents: number;
    percentage: number;
  };
}

export function AttendanceDesktopView({
  events,
  searchQuery,
  onSearchChange,
  filteredMembers,
  isPresent,
  toggleAttendance,
  getMemberAttendanceStats,
}: AttendanceDesktopViewProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Attendance Tracker
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari member..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left text-sm font-semibold text-foreground min-w-[200px]">
                  Member
                </th>
                {events.map((event) => (
                  <th
                    key={event.id}
                    className="px-4 py-3 text-center text-sm font-semibold text-foreground min-w-[120px]"
                  >
                    <div className="space-y-1">
                      <div
                        className="truncate max-w-[100px]"
                        title={event.title}
                      >
                        {event.title.length > 12
                          ? event.title.substring(0, 10) + "..."
                          : event.title}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {format(event.date, "MMM d")}
                      </div>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground min-w-[100px]">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => {
                const stats = getMemberAttendanceStats(member.id);
                return (
                  <tr
                    key={member.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="sticky left-0 z-10 px-4 py-3">
                      <div>
                        <div className="font-medium text-foreground">
                          {member.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.division}
                        </div>
                      </div>
                    </td>
                    {events.map((event) => (
                      <td key={event.id} className="px-4 py-3 text-center">
                        <Checkbox
                          checked={isPresent(member.id, event.id)}
                          onCheckedChange={() =>
                            toggleAttendance(member.id, event.id)
                          }
                          aria-label={`Mark ${member.name} ${
                            isPresent(member.id, event.id)
                              ? "absent"
                              : "present"
                          } for ${event.title}`}
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant={
                          stats.percentage >= 80
                            ? "green"
                            : stats.percentage >= 50
                            ? "yellow"
                            : "gray"
                        }
                      >
                        {stats.percentage}% Attendance
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
