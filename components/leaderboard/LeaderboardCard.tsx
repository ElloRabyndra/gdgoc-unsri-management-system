"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RankDisplay } from "@/components/leaderboard/RankDisplay";
import { ManagePointsDialog } from "@/components/leaderboard/ManagePointsDialog";
import { MemberBadges } from "@/components/leaderboard/MemberBadges";
import { LeaderboardMember } from "@/types";

interface LeaderboardCardProps {
  member: LeaderboardMember;
  rank: number;
  onUpdatePoints: (memberId: string, points: number) => void;
}

export function LeaderboardCard({
  member,
  rank,
  onUpdatePoints,
}: LeaderboardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <RankDisplay rank={rank} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate">{member.name}</h3>
              <span className="font-semibold">
                {member.points}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {member.email}
            </p>

            <MemberBadges division={member.division} status={member.status} />
          </div>
        </div>

        <ManagePointsDialog
          member={member}
          onUpdatePoints={onUpdatePoints}
          trigger={
            <Button variant="outline" size="sm" className="w-full mt-3">
              Manage Points
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
