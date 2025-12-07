"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Division,
  MemberStatus,
  SortOrder,
  DIVISIONS,
  MEMBER_STATUSES,
  SORT_ORDERS,
} from "@/types";

interface LeaderboardFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  divisionFilter: Division | "all";
  onDivisionChange: (value: Division | "all") => void;
  statusFilter: MemberStatus | "all";
  onStatusChange: (value: MemberStatus | "all") => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
}

export function LeaderboardFilters({
  searchQuery,
  onSearchChange,
  divisionFilter,
  onDivisionChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortOrderChange,
}: LeaderboardFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select
          value={divisionFilter}
          onValueChange={(value) => onDivisionChange(value as Division | "all")}
        >
          <SelectTrigger className="w-[180px]">
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

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            onStatusChange(value as MemberStatus | "all")
          }
        >
          <SelectTrigger className="w-[140px]">
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

        <Select
          value={sortOrder}
          onValueChange={(value) => onSortOrderChange(value as SortOrder)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            {SORT_ORDERS.map((order) => (
              <SelectItem key={order.value} value={order.value}>
                {order.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
