import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
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
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

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

  // Fetch members from Firestore
  const fetchMembers = async () => {
    try {
      setIsLoadingData(true);
      const membersRef = collection(db, "members");
      const q = query(membersRef, orderBy("joinDate", "desc"));
      const querySnapshot = await getDocs(q);

      const membersData: Member[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          division: data.division as Division,
          role: data.role as MemberRole,
          status: data.status as MemberStatus,
          joinDate:
            data.joinDate instanceof Timestamp
              ? data.joinDate.toDate()
              : new Date(data.joinDate),
        };
      });

      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchMembers();
  }, []);

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
  const addMember = async (data: any) => {
    try {
      const membersRef = collection(db, "members");
      const newMemberData = {
        name: data.name,
        email: data.email,
        division: data.division,
        role: data.role,
        status: data.status,
        joinDate: Timestamp.fromDate(data.joinDate),
      };

      await addDoc(membersRef, newMemberData);
      toast.success("Member added successfully!");

      // Refresh data
      await fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member");
      throw error;
    }
  };

  const updateMember = async (id: string, data: any) => {
    try {
      const memberRef = doc(db, "members", id);
      const updateData = {
        name: data.name,
        email: data.email,
        division: data.division,
        role: data.role,
        status: data.status,
        joinDate: Timestamp.fromDate(data.joinDate),
      };

      await updateDoc(memberRef, updateData);
      toast.success("Member updated successfully!");

      // Refresh data
      await fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member");
      throw error;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      // Delete the member
      const memberRef = doc(db, "members", id);
      await deleteDoc(memberRef);

      // Delete all attendance records for this member
      const attendanceRef = collection(db, "attendance");
      const attendanceQuery = query(attendanceRef, where("memberId", "==", id));
      const attendanceSnapshot = await getDocs(attendanceQuery);

      // Delete all related attendance records
      const deleteAttendancePromises = attendanceSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteAttendancePromises);

      // Remove member from all event committees
      const eventsRef = collection(db, "events");
      const eventsQuery = query(
        eventsRef,
        where("committee", "array-contains", id)
      );
      const eventsSnapshot = await getDocs(eventsQuery);

      // Update all events that have this member in committee
      const updateEventPromises = eventsSnapshot.docs.map(async (eventDoc) => {
        const eventData = eventDoc.data();
        const updatedCommittee = eventData.committee.filter(
          (memberId: string) => memberId !== id
        );

        return updateDoc(eventDoc.ref, {
          committee: updatedCommittee,
        });
      });
      await Promise.all(updateEventPromises);

      toast.success("Member deleted successfully!");

      // Refresh data
      await fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
      throw error;
    }
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

    try {
      if (editingMember) {
        await updateMember(editingMember.id, data);
      } else {
        await addMember(data);
      }

      setIsFormOpen(false);
      setEditingMember(null);
    } catch (error) {
      // Error already handled in CRUD functions
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMember) return;

    setIsLoading(true);
    try {
      await deleteMember(deletingMember.id);
      setDeletingMember(null);
    } catch (error) {
      // Error already handled in deleteMember
    } finally {
      setIsLoading(false);
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

  return {
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
  };
}
