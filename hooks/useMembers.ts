import { useState, useMemo } from "react";
import { z } from "zod";
import { useMembers as useMembersQuery, useAddMember, useUpdateMember, useDeleteMember } from "@/hooks/useFirebaseQueries";
import { type Member } from "@/types";

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
  // 1. Mengambil data menggunakan React Query hook
  const { data: members = [], isLoading: isLoadingData, error } = useMembersQuery();

  // Menggunakan mutation hooks
  const addMemberMutation = useAddMember();
  const updateMemberMutation = useUpdateMember();
  const deleteMemberMutation = useDeleteMember();

  // 2. State untuk UI tetap dikelola di sini (filter, dialog, dll)
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  // 3. Logika filter tetap sama, tapi sekarang sumber datanya dari React Query
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

  // 4. Handler UI yang memicu mutasi
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

  const handleFormSubmit = async (data: MemberFormValues) => {
    try {
      if (editingMember) {
        await updateMemberMutation.mutateAsync({ id: editingMember.id, data });
      } else {
        await addMemberMutation.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingMember(null);
    } catch (e) {
      // Error sudah di-handle di dalam mutation hook (toast)
      console.error(e);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMember) return;
    try {
      await deleteMemberMutation.mutateAsync(deletingMember.id);
      setDeletingMember(null);
    } catch (e) {
      console.error(e);
    }
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

  // 5. Return value disesuaikan
  return {
    // Data and state
    filteredMembers,
    isLoadingData,
    error,

    // Filter state
    search,
    setSearch,
    divisionFilter,
    setDivisionFilter,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,

    // UI state
    isFormOpen,
    editingMember,
    deletingMember,
    isLoading: addMemberMutation.isPending || updateMemberMutation.isPending || deleteMemberMutation.isPending,

    // UI handlers
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    handleFormSubmit,
    handleConfirmDelete,
    handleFormOpenChange,
    handleDeleteDialogOpenChange,
  };
}