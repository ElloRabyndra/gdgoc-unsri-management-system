"use client";

import { useState, useMemo, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Division,
  MemberStatus,
  SortOrder,
  LeaderboardMember,
  Member,
} from "@/types";
import { toast } from "sonner";

export function useLeaderboard() {
  const [members, setMembers] = useState<LeaderboardMember[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<Division | "all">("all");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("high-low");

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      setIsLoadingData(true);

      // Fetch all members
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

      // Fetch all leaderboard records
      const leaderboardRef = collection(db, "leaderboard");
      const leaderboardSnapshot = await getDocs(leaderboardRef);

      // Create a map of memberId -> points
      const pointsMap = new Map<string, number>();
      leaderboardSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        pointsMap.set(data.memberId, data.points || 0);
      });

      // Combine members with their points (default to 0 if not in leaderboard)
      const leaderboardData: LeaderboardMember[] = membersData.map(
        (member) => ({
          ...member,
          points: pointsMap.get(member.id) || 0,
        })
      );

      setMembers(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      toast.error("Failed to load leaderboard data");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let result = [...members];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
      );
    }

    if (divisionFilter !== "all") {
      result = result.filter((member) => member.division === divisionFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortOrder === "high-low") {
        return b.points - a.points;
      }
      return a.points - b.points;
    });

    return result;
  }, [members, searchQuery, divisionFilter, statusFilter, sortOrder]);

  // Update points for a member
  const updatePoints = async (memberId: string, pointsChange: number) => {
    try {
      // Find current member
      const member = members.find((m) => m.id === memberId);
      if (!member) return;

      const newPoints = Math.max(0, member.points + pointsChange);

      // Check if leaderboard record exists
      const leaderboardRef = collection(db, "leaderboard");
      const q = query(leaderboardRef, where("memberId", "==", memberId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new record
        await addDoc(leaderboardRef, {
          memberId,
          points: newPoints,
        });
      } else {
        // Update existing record
        const docRef = doc(db, "leaderboard", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          points: newPoints,
        });
      }

      // Update local state
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, points: newPoints } : m))
      );

      const action = pointsChange > 0 ? "added to" : "subtracted from";
      toast.success(
        `${Math.abs(pointsChange)} points ${action} ${member.name}`
      );
    } catch (error) {
      console.error("Error updating points:", error);
      toast.error("Failed to update points");
    }
  };

  return {
    members: filteredMembers,
    isLoadingData,
    searchQuery,
    setSearchQuery,
    divisionFilter,
    setDivisionFilter,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    updatePoints,
  };
}
