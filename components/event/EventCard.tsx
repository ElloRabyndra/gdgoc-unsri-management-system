import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@/types";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Done":
        return "success";
      case "On Going":
        return "blue";
      case "Pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getTypeVariant = (type: string) => {
    return type === "Online" ? "blue" : "green";
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate-fade-in"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {event.title}
          </CardTitle>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
          <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(event.date, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{event.committee.length} members</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
