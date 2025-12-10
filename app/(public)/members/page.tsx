"use client";

import { MembersPageHeader } from "@/components/members/MembersPageHeader";
import { MembersFilters } from "@/components/members/MembersFilters";
import { MembersList } from "@/components/members/MembersList";
import { MemberForm } from "@/components/members/MemberForm";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useMembers } from "@/hooks/useMembers";
import { useIsMobile } from "@/hooks/useMobile";
import { Loader2 } from "lucide-react";

export default function Members() {
  const isMobile = useIsMobile();
  const {
    members,
    filteredMembers,
    isLoadingData,
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
  } = useMembers();

  // Loading state
  if (isLoadingData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading members...</p>
        </div>
      </div>
    );
  }

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
        onOpenChange={handleFormOpenChange}
        member={editingMember}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
      />

      <ConfirmDialog
        open={!!deletingMember}
        onOpenChange={handleDeleteDialogOpenChange}
        title="Delete Member"
        description={`Are you sure you want to delete ${deletingMember?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        variant="destructive"
      />
    </div>
  );
}
