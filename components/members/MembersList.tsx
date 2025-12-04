import { Users } from "lucide-react";
import { MemberTable } from "@/components/members/MemberTable";
import { MemberCard } from "@/components/members/MemberCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { type Member } from "@/types";

interface MembersListProps {
  members: Member[];
  filteredMembers: Member[];
  isMobile: boolean;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onAddMember: () => void;
}

export function MembersList({
  members,
  filteredMembers,
  isMobile,
  onEdit,
  onDelete,
  onAddMember,
}: MembersListProps) {
  if (filteredMembers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No members found"
        description={
          members.length === 0
            ? "Get started by adding your first member"
            : "Try adjusting your search or filters"
        }
        actionLabel={members.length === 0 ? "Add Member" : undefined}
        onAction={members.length === 0 ? onAddMember : undefined}
      />
    );
  }

  if (isMobile) {
    return (
      <div className="grid gap-4">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <MemberTable
      members={filteredMembers}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}