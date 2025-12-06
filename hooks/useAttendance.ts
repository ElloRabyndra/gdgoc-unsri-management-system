import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { type Attendance, type Event, type Member } from "@/types";
import { toast } from "sonner";

export function useAttendance() {
  const router = useRouter();

  // Data state
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // UI state
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all data from Firestore
  const fetchData = async () => {
    try {
      setIsLoadingData(true);

      // Fetch events
      const eventsRef = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsRef);
      const eventsData: Event[] = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          date:
            data.date instanceof Timestamp
              ? data.date.toDate()
              : new Date(data.date),
          type: data.type,
          status: data.status,
          description: data.description,
          committee: data.committee || [],
        };
      });
      setEvents(eventsData);

      // Set selected event to first event
      if (eventsData.length > 0 && !selectedEventId) {
        setSelectedEventId(eventsData[0].id);
      }

      // Fetch members
      const membersRef = collection(db, "members");
      const membersSnapshot = await getDocs(membersRef);
      const membersData: Member[] = membersSnapshot.docs.map((doc) => {
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
      setMembers(membersData);

      // Fetch attendance
      const attendanceRef = collection(db, "attendance");
      const attendanceSnapshot = await getDocs(attendanceRef);
      const attendanceData: Attendance[] = attendanceSnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            memberId: data.memberId,
            eventId: data.eventId,
            present: data.present,
          };
        }
      );
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  // Selected event
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Attendance operations
  const toggleAttendance = async (memberId: string, eventId: string) => {
    try {
      const existing = attendance.find(
        (a) => a.memberId === memberId && a.eventId === eventId
      );

      if (existing) {
        // Update existing record
        const attendanceRef = doc(db, "attendance", existing.id!);
        await updateDoc(attendanceRef, {
          present: !existing.present,
        });

        // Update local state
        setAttendance((prev) =>
          prev.map((a) =>
            a.id === existing.id ? { ...a, present: !a.present } : a
          )
        );
      } else {
        // Create new record
        const attendanceRef = collection(db, "attendance");
        const newAttendanceData = {
          memberId,
          eventId,
          present: true,
        };

        const docRef = await addDoc(attendanceRef, newAttendanceData);

        // Update local state
        setAttendance((prev) => [
          ...prev,
          { id: docRef.id, ...newAttendanceData },
        ]);
      }

      toast.success("Attendance updated");
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
    }
  };

  const isPresent = (memberId: string, eventId: string) => {
    const record = attendance.find(
      (a) => a.memberId === memberId && a.eventId === eventId
    );
    return record?.present || false;
  };

  const getMemberAttendanceStats = (memberId: string) => {
    // Filter hanya attendance untuk event yang masih ada
    const validEventIds = new Set(events.map((e) => e.id));

    const validAttendance = attendance.filter((a) =>
      validEventIds.has(a.eventId)
    );

    // Hitung jumlah event di mana member hadir (present: true)
    const presentCount = validAttendance.filter(
      (a) => a.memberId === memberId && a.present === true
    ).length;

    // Total events yang ada
    const totalEvents = events.length;

    // Hitung persentase
    const percentage =
      totalEvents > 0 ? Math.round((presentCount / totalEvents) * 100) : 0;

    return { presentCount, totalEvents, percentage };
  };

  // Navigation handler
  const handleCreateEvent = () => {
    router.push("/events");
  };

  return {
    events,
    members,
    filteredMembers,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    searchQuery,
    setSearchQuery,
    isLoadingData,
    toggleAttendance,
    isPresent,
    getMemberAttendanceStats,
    handleCreateEvent,
  };
}
