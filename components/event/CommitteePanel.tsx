import { Users, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Member } from "@/types";

interface CommitteePanelProps {
  selectedMemberIds: string[];
  allMembers: Member[];
  filteredMembers: Member[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onToggleMember: (memberId: string) => void;
}

export function CommitteePanel({
  selectedMemberIds,
  allMembers,
  filteredMembers,
  searchValue,
  onSearchChange,
  onToggleMember,
}: CommitteePanelProps) {
  const selectedMembers = allMembers.filter((m) =>
    selectedMemberIds.includes(m.id)
  );

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Committee Members
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Selected ({selectedMembers.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((member) => (
                <Badge key={member.id} variant="blue" className="pr-1">
                  {member.name}
                  <button
                    type="button"
                    onClick={() => onToggleMember(member.id)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Members List */}
        <div className="max-h-[400px] overflow-y-auto rounded-lg border border-border p-3 space-y-2">
          {filteredMembers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No members found
            </p>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={member.id}
                  checked={selectedMemberIds.includes(member.id)}
                  onCheckedChange={() => onToggleMember(member.id)}
                />
                <label
                  htmlFor={member.id}
                  className="flex-1 text-sm font-medium leading-none cursor-pointer"
                >
                  <span>{member.name}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {member.division}
                  </span>
                </label>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
