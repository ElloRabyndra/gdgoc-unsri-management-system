import { useState, ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeaderboardMember } from "@/types";

interface ManagePointsDialogProps {
  member: LeaderboardMember;
  onUpdatePoints: (memberId: string, points: number) => void;
  trigger: ReactNode;
}

export function ManagePointsDialog({
  member,
  onUpdatePoints,
  trigger,
}: ManagePointsDialogProps) {
  const [points, setPoints] = useState("10");
  const [open, setOpen] = useState(false);

  const handleUpdatePoints = (isAdding: boolean) => {
    const pointsNum = parseInt(points, 10);
    if (isNaN(pointsNum) || pointsNum <= 0) return;

    onUpdatePoints(member.id, isAdding ? pointsNum : -pointsNum);
    setOpen(false);
    setPoints("10");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Points - {member.name}</DialogTitle>
          <DialogDescription>
            Current points:{" "}
            <span className="font-semibold">{member.points}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <label className="text-sm font-medium">Points Amount</label>
          <Input
            type="number"
            min="1"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="mt-2"
          />
        </div>
        <DialogFooter className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => handleUpdatePoints(false)}
            className="flex-1 text-google-red border-google-red/30 hover:bg-google-red/10"
          >
            <Minus className="h-4 w-4 mr-1" />
            Subtract
          </Button>
          <Button
            onClick={() => handleUpdatePoints(true)}
            className="flex-1 bg-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
