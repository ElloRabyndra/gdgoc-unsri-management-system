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

export function useMembers() {
  // Data state
  const [members, setMembers] = useState<Member[]>(dummyMembers);

  // Filter state
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtered members
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

  // CRUD operations
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

  // UI Handlers
  const handleAddMember = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteMember = (member: Member) => {
    setDeletingMember(member);
  };

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (editingMember) {
      updateMember(editingMember.id, data);
    } else {
      addMember(data);
    }

    setIsLoading(false);
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMember) return;

    deleteMember(deletingMember.id);
    setDeletingMember(null);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingMember(null);
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeletingMember(null);
    }
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
    isFormOpen,
    editingMember,
    deletingMember,
    isLoading,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    handleFormSubmit,
    handleConfirmDelete,
    handleFormOpenChange,
    handleDeleteDialogOpenChange,
  };
}
