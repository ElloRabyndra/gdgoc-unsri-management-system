import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { type Member, type Event, type Attendance } from "@/types";
import { toast } from "sonner";

// QUERY KEYS - Untuk identifikasi cache
export const queryKeys = {
  members: ["members"] as const,
  events: ["events"] as const,
  attendance: ["attendance"] as const,
  leaderboard: ["leaderboard"] as const,
};

// Fetch Members
async function fetchMembers(): Promise<Member[]> {
  const membersRef = collection(db, "members");
  const q = query(membersRef, orderBy("joinDate", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      division: data.division,
      role: data.role,
      status: data.status,
      joinDate:
        data.joinDate instanceof Timestamp
          ? data.joinDate.toDate()
          : new Date(data.joinDate),
    };
  });
}

// Fetch Events
async function fetchEvents(): Promise<Event[]> {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      date:
        data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
      type: data.type,
      status: data.status,
      description: data.description,
      committee: data.committee || [],
    };
  });
}

// Fetch Attendance
async function fetchAttendance(): Promise<Attendance[]> {
  const attendanceRef = collection(db, "attendance");
  const querySnapshot = await getDocs(attendanceRef);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      memberId: data.memberId,
      eventId: data.eventId,
      present: data.present,
    };
  });
}

// Fetch Leaderboard
async function fetchLeaderboard() {
  const [members, leaderboardData] = await Promise.all([
    fetchMembers(),
    getDocs(collection(db, "leaderboard")),
  ]);

  const pointsMap = new Map<string, number>();
  leaderboardData.docs.forEach((doc) => {
    const data = doc.data();
    pointsMap.set(data.memberId, data.points || 0);
  });

  return members.map((member) => ({
    ...member,
    points: pointsMap.get(member.id) || 0,
  }));
}

// QUERY HOOKS

export function useMembers() {
  return useQuery({
    queryKey: queryKeys.members,
    queryFn: fetchMembers,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: fetchEvents,
  });
}

export function useAttendance() {
  return useQuery({
    queryKey: queryKeys.attendance,
    queryFn: fetchAttendance,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: queryKeys.leaderboard,
    queryFn: fetchLeaderboard,
  });
}

// MUTATION HOOKS

// Add Member
export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
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
    },
    onSuccess: () => {
      // Invalidate cache agar refetch otomatis
      queryClient.invalidateQueries({ queryKey: queryKeys.members });
      toast.success("Member added successfully!");
    },
    onError: (error) => {
      console.error("Error adding member:", error);
      toast.error("Failed to add member");
    },
  });
}

// Update Member
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members });
      toast.success("Member updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating member:", error);
      toast.error("Failed to update member");
    },
  });
}

// Delete Member
export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Delete member
      await deleteDoc(doc(db, "members", id));

      // Delete related attendance
      const attendanceRef = collection(db, "attendance");
      const attendanceQuery = query(attendanceRef, where("memberId", "==", id));
      const attendanceSnapshot = await getDocs(attendanceQuery);
      await Promise.all(attendanceSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

      // Delete leaderboard record
      const leaderboardRef = collection(db, "leaderboard");
      const leaderboardQuery = query(leaderboardRef, where("memberId", "==", id));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);
      await Promise.all(
        leaderboardSnapshot.docs.map((doc) => deleteDoc(doc.ref))
      );

      // Remove from event committees
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, where("committee", "array-contains", id));
      const eventsSnapshot = await getDocs(eventsQuery);
      await Promise.all(
        eventsSnapshot.docs.map((eventDoc) => {
          const eventData = eventDoc.data();
          const updatedCommittee = eventData.committee.filter(
            (memberId: string) => memberId !== id
          );
          return updateDoc(eventDoc.ref, { committee: updatedCommittee });
        })
      );
    },
    onSuccess: () => {
      // Invalidate multiple caches
      queryClient.invalidateQueries({ queryKey: queryKeys.members });
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard });
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      toast.success("Member deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    },
  });
}

// Add Event
export function useAddEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const eventsRef = collection(db, "events");
      const newEventData = {
        title: data.title,
        date: Timestamp.fromDate(data.date),
        type: data.type,
        status: data.status,
        description: data.description,
        committee: data.committee || [],
      };
      await addDoc(eventsRef, newEventData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      toast.success("Event added successfully!");
    },
    onError: (error) => {
      console.error("Error adding event:", error);
      toast.error("Failed to add event");
    },
  });
}

// Update Event
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const eventRef = doc(db, "events", id);
      const updateData = {
        title: data.title,
        date: Timestamp.fromDate(data.date),
        type: data.type,
        status: data.status,
        description: data.description,
        committee: data.committee || [],
      };
      await updateDoc(eventRef, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      toast.success("Event updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    },
  });
}

// Delete Event
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Delete event
      await deleteDoc(doc(db, "events", id));

      // Delete related attendance
      const attendanceRef = collection(db, "attendance");
      const q = query(attendanceRef, where("eventId", "==", id));
      const attendanceSnapshot = await getDocs(q);
      await Promise.all(
        attendanceSnapshot.docs.map((doc) => deleteDoc(doc.ref))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance });
      toast.success("Event deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    },
  });
}

// Toggle Attendance
export function useToggleAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      eventId,
      attendance,
    }: {
      memberId: string;
      eventId: string;
      attendance: Attendance[];
    }) => {
      const existing = attendance.find(
        (a) => a.memberId === memberId && a.eventId === eventId
      );

      if (existing) {
        const attendanceRef = doc(db, "attendance", existing.id!);
        await updateDoc(attendanceRef, { present: !existing.present });
      } else {
        const attendanceRef = collection(db, "attendance");
        await addDoc(attendanceRef, {
          memberId,
          eventId,
          present: true,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance });
      toast.success("Attendance updated");
    },
    onError: (error) => {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
    },
  });
}

// Update Points
export function useUpdatePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      newPoints,
    }: {
      memberId: string;
      newPoints: number;
    }) => {
      const leaderboardRef = collection(db, "leaderboard");
      const q = query(leaderboardRef, where("memberId", "==", memberId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(leaderboardRef, { memberId, points: newPoints });
      } else {
        const docRef = doc(db, "leaderboard", querySnapshot.docs[0].id);
        await updateDoc(docRef, { points: newPoints });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard });
    },
    onError: (error) => {
      console.error("Error updating points:", error);
      toast.error("Failed to update points");
    },
  });
}