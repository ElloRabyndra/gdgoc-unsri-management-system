"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { ManagePointsDialog } from "@/components/leaderboard/ManagePointsDialog";
import { MemberBadges } from "@/components/leaderboard/MemberBadges";
import { LeaderboardMember } from "@/types";

interface LeaderboardTableProps {
  members: LeaderboardMember[];
  onUpdatePoints: (memberId: string, points: number) => void;
}

export function LeaderboardTable({
  members,
  onUpdatePoints,
}: LeaderboardTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-20">Rank</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={member.id} className="hover:bg-muted/30">
              <TableCell>
                <RankBadge rank={index + 1} />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <MemberBadges 
                  division={member.division}
                  showStatus={false}
                />
              </TableCell>
              <TableCell>
                <MemberBadges 
                  status={member.status}
                  showDivision={false}
                />
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">{member.points}</span>
              </TableCell>
              <TableCell>
                <ManagePointsDialog 
                  member={member}
                  onUpdatePoints={onUpdatePoints}
                  trigger={
                    <Button variant="outline" size="sm">
                      Manage Points
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}