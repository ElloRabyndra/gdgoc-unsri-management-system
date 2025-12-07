import { Trophy, Medal } from "lucide-react";

interface RankDisplayProps {
  rank: number;
}

export function RankDisplay({ rank }: RankDisplayProps) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-google-yellow/20">
        <Trophy className="h-5 w-5 text-google-yellow" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-google-green/20">
        <Medal className="h-5 w-5 text-google-green" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-google-red/20">
        <Medal className="h-5 w-5 text-google-red" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full border-muted-foreground/30 bg-muted/30 text-muted-foreground">
      <span className="font-bold">{rank}</span>
    </div>
  );
}
