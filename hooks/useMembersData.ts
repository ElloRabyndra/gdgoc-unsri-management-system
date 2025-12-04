import { useState, useMemo } from "react";
import { z } from "zod";
import { dummyMembers } from "@/lib/dummy-members";
import {
  type Member,
  type Division,
  type MemberRole,
  type MemberStatus,
} from "@/types";
import { toast } from "sonner";

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  division: z.string().min(1, "Division is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  joinDate: z.date(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export function useMembersData() {
  const [members, setMembers] = useState<Member[]>(dummyMembers);
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());
      const matchesDivision =
        divisionFilter === "all" || member.division === divisionFilter;
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchesSearch && matchesDivision && matchesRole && matchesStatus;
    });
  }, [members, search, divisionFilter, roleFilter, statusFilter]);

  const addMember = (data: any) => {
    const newMember: Member = {
      id: String(Date.now()),
      ...data,
      division: data.division as Division,
      role: data.role as MemberRole,
      status: data.status as MemberStatus,
    };
    setMembers((prev) => [...prev, newMember]);
    toast.success("Member added successfully!");
  };

  const updateMember = (id: string, data: any) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              ...data,
              division: data.division as Division,
              role: data.role as MemberRole,
              status: data.status as MemberStatus,
            }
          : m
      )
    );
    toast.success("Member updated successfully!");
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Member deleted successfully!");
  };

  return {
    members,
    filteredMembers,
    search,
    setSearch,
    divisionFilter,
    setDivisionFilter,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    addMember,
    updateMember,
    deleteMember,
  };
}
