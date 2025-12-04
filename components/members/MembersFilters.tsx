import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIVISIONS, MEMBER_ROLES, MEMBER_STATUSES } from "@/types";

interface MembersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  divisionFilter: string;
  onDivisionFilterChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function MembersFilters({
  search,
  onSearchChange,
  divisionFilter,
  onDivisionFilterChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: MembersFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={divisionFilter} onValueChange={onDivisionFilterChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="All Divisions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Divisions</SelectItem>
          {DIVISIONS.map((division) => (
            <SelectItem key={division} value={division}>
              {division}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-full md:w-[150px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {MEMBER_ROLES.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full md:w-[150px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {MEMBER_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}