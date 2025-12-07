import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { type Member, type Event } from "@/types";
import { toast } from "sonner";

export function useDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      setIsLoadingData(true);

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
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter members (exclude "No Division") and role is member
  const membersWithDivision = useMemo(() => {
    return members.filter((m) => (m.division !== "No Division" && m.role === "Member"));
  }, [members]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalMembers = membersWithDivision.length;
    const totalEvents = events.length;

    const upcomingEvents = events.filter((e) => {
      const status = e.status.toLowerCase();
      return (
        status === "upcoming" || status === "ongoing" || status === "pending"
      );
    }).length;

    // Count active members (case-insensitive)
    const activeMembers = membersWithDivision.filter((m) => {
      return m.status.toLowerCase() === "active";
    }).length;

    return { totalMembers, totalEvents, upcomingEvents, activeMembers };
  }, [membersWithDivision, events]);

  return {
    members: membersWithDivision,
    events,
    stats,
    isLoadingData,
  };
}
