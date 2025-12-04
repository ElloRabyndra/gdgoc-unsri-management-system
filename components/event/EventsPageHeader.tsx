import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventsPageHeaderProps {
  onAddEvent: () => void;
}

export function EventsPageHeader({ onAddEvent }: EventsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Events</h2>
        <p className="text-muted-foreground">Manage GDGoC UNSRI events</p>
      </div>
      <Button onClick={onAddEvent}>
        <Plus className="h-4 w-4 mr-2" />
        Add Event
      </Button>
    </div>
  );
}