import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MembersPageHeaderProps {
  onAddMember: () => void;
}

export function MembersPageHeader({ onAddMember }: MembersPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Members</h2>
        <p className="text-muted-foreground">Manage GDGoC UNSRI members</p>
      </div>
      <Button onClick={onAddMember}>
        <Plus className="h-4 w-4 mr-2" />
        Add Member
      </Button>
    </div>
  );
}