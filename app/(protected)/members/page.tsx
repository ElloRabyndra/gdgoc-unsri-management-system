"use client";
import { useState } from "react";
import { MembersPageHeader } from "@/components/members/MembersPageHeader";
import { MembersFilters } from "@/components/members/MembersFilters";
import { MembersList } from "@/components/members/MembersList";
import { MemberForm } from "@/components/members/MemberForm";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useMembersData } from "@/hooks/useMembersData";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Member } from "@/types";

export default function Members() {
  const isMobile = useIsMobile();
  const {
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
  } = useMembersData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="space-y-6">
      <MembersPageHeader onAddMember={handleAddMember} />

      <MembersFilters
        search={search}
        onSearchChange={setSearch}
        divisionFilter={divisionFilter}
        onDivisionFilterChange={setDivisionFilter}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <MembersList
        members={members}
        filteredMembers={filteredMembers}
        isMobile={isMobile}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
        onAddMember={handleAddMember}
      />

      <MemberForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        member={editingMember}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />

      <ConfirmDialog
        open={!!deletingMember}
        onOpenChange={(open) => !open && setDeletingMember(null)}
        title="Delete Member"
        description={`Are you sure you want to delete ${deletingMember?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        variant="destructive"
      />
    </div>
  );
}
