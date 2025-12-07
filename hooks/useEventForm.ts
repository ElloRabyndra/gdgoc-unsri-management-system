import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";
import { type Event, type Member } from "@/types";
import { toast } from "sonner";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  date: z.date(),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required").max(1000),
  committee: z.array(z.string()),
});

export type EventFormValues = z.infer<typeof eventSchema>;

interface UseEventFormProps {
  event?: Event | null;
  onSubmit: (data: EventFormValues) => void | Promise<void>;
}

export function useEventForm({ event, onSubmit }: UseEventFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [committeeSearch, setCommitteeSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      type: "",
      status: "",
      description: "",
      committee: [],
    },
  });

  // Fetch members from Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoadingMembers(true);
        const membersRef = collection(db, "members");
        const q = query(membersRef, orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);

        const membersData: Member[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            division: data.division,
            role: data.role,
            status: data.status,
            joinDate: data.joinDate.toDate(),
          };
        });

        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
        toast.error("Failed to load members");
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  // Reset form when event changes
  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        date: event.date,
        type: event.type,
        status: event.status,
        description: event.description,
        committee: event.committee || [],
      });
    } else {
      form.reset({
        title: "",
        date: new Date(),
        type: "",
        status: "",
        description: "",
        committee: [],
      });
    }
  }, [event, form]);

  const selectedCommittee = form.watch("committee");

  const filteredMembers = useMemo(() => {
    if (!committeeSearch.trim()) return members;
    const search = committeeSearch.toLowerCase();
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        member.division.toLowerCase().includes(search)
    );
  }, [members, committeeSearch]);

  const toggleCommitteeMember = (memberId: string) => {
    const current = form.getValues("committee");
    if (current.includes(memberId)) {
      form.setValue(
        "committee",
        current.filter((id) => id !== memberId)
      );
    } else {
      form.setValue("committee", [...current, memberId]);
    }
  };

  const handleSubmit = async (data: EventFormValues) => {
    setIsLoading(true);

    try {
      await onSubmit(data);
      router.push("/events");
    } catch (error) {
      // handle in parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/events");
  };

  const handleBack = () => {
    router.push("/events");
  };

  return {
    form,
    isLoading,
    isLoadingMembers,
    members,
    filteredMembers,
    selectedCommittee,
    committeeSearch,
    setCommitteeSearch,
    toggleCommitteeMember,
    handleSubmit,
    handleCancel,
    handleBack,
  };
}
