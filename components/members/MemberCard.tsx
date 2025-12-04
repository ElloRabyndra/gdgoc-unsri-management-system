import { format } from "date-fns";
import { Edit, Trash2, Mail, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Member } from "@/types";

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const getStatusVariant = (status: string) => {
    return status === "Active" ? "green" : "red";
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "Executive":
        return "default";
      case "Core Team":
        return "blue";
      default:
        return "gray";
    }
  };
  console.log(member);
  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-foreground">{member.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Mail className="h-3 w-3" />
              <span className="truncate max-w-[200px]">{member.email}</span>
            </div>
          </div>
          <Badge variant={getStatusVariant(member.status)}>
            {member.status}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="blue">{member.division}</Badge>
          <Badge variant={getRoleVariant(member.role)}>{member.role}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3" />
            <span>Joined {format(member.joinDate, "MMM d, yyyy")}</span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(member)}
              aria-label="Edit member"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(member)}
              aria-label="Delete member"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
