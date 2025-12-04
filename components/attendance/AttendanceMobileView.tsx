import { format } from "date-fns";
import { CheckSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { type Event, type Member } from "@/types";

interface AttendanceMobileViewProps {
  selectedEventId: string;
  onEventChange: (eventId: string) => void;
  events: Event[];
  selectedEvent: Event | undefined;
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

export function AttendanceMobileView({
  selectedEventId,
  onEventChange,
  events,
  selectedEvent,
  searchQuery,
  onSearchChange,
  filteredMembers,
  isPresent,
  toggleAttendance,
  getMemberAttendanceStats,
}: AttendanceMobileViewProps) {
  return (
    <Card className="animate-fade-in overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckSquare className="h-5 w-5" />
          Attendance Tracker
        </CardTitle>
        <div className="pt-2 space-y-3">
          <Select value={selectedEventId} onValueChange={onEventChange}>
            <SelectTrigger className="max-w-[calc(100vw-6rem)] sm:w-full">
              <span className="truncate block">
                {selectedEvent
                  ? `${selectedEvent.title} - ${format(
                      selectedEvent.date,
                      "MMM d, yyyy"
                    )}`
                  : "Select event"}
              </span>
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              className="max-w-[calc(100vw-6rem)] sm:w-full"
            >
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  <span className="truncate block max-w-[250px]">
                    {event.title} - {format(event.date, "MMM d, yyyy")}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
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
      <CardContent className="space-y-3">
        {filteredMembers.map((member) => {
          const stats = getMemberAttendanceStats(member.id);
          return (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">
                  {member.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {member.division}
                </div>
                <Badge
                  variant={
                    stats.percentage >= 80
                      ? "green"
                      : stats.percentage >= 50
                      ? "yellow"
                      : "gray"
                  }
                  className="mt-1 text-xs"
                >
                  {stats.percentage}% Attendance
                </Badge>
              </div>
              <Checkbox
                checked={isPresent(member.id, selectedEventId)}
                onCheckedChange={() =>
                  toggleAttendance(member.id, selectedEventId)
                }
                aria-label={`Mark ${member.name} attendance for ${selectedEvent?.title}`}
                className="h-6 w-6"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
