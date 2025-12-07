import { Trophy, Medal } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1">
        <Trophy className="h-5 w-5 text-google-yellow" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1">
        <Medal className="h-5 w-5 text-google-green" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1">
        <Medal className="h-5 w-5 text-google-red" />
      </div>
    );
  }
  return <span className="text-muted-foreground font-medium ml-1">{rank}</span>;
}
