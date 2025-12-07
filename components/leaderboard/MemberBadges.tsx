import { Badge } from "@/components/ui/badge";
import { Division, MemberStatus } from "@/types";

interface MemberBadgesProps {
  division?: Division;
  status?: MemberStatus;
  showDivision?: boolean;
  showStatus?: boolean;
}

export function MemberBadges({
  division,
  status,
  showDivision = true,
  showStatus = true,
}: MemberBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {showDivision && division && (
        <Badge
          variant="outline"
          className="bg-google-blue/10 text-google-blue border-google-blue/30 text-xs"
        >
          {division}
        </Badge>
      )}
      {showStatus && status && (
        <Badge
          variant={status === "Active" ? "green" : "red"}
        >
          {status}
        </Badge>
      )}
    </div>
  );
}
