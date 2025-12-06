export type Division =
  | "No Division"
  | "Machine Learning"
  | "Cyber Security"
  | "Front-End Development"
  | "Back-End Development"
  | "UI/UX"
  | "Game Development"
  | "Mobile Development"
  | "Public Relation"
  | "Project Management"
  | "Community Development"
  | "Videography"
  | "Copywriting"
  | "Creative Design"
  ;

export type MemberRole = "Member" | "Core Team" | "Executive";
export type MemberStatus = "Active" | "Non-Active";
export type EventType = "Offline" | "Online";
export type EventStatus = "Pending" | "On Going" | "Done";

export interface Member {
  id: string;
  name: string;
  email: string;
  division: Division;
  role: MemberRole;
  status: MemberStatus;
  joinDate: Date;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  status: EventStatus;
  description: string;
  committee: string[];
}

export interface Attendance {
  memberId: string;
  eventId: string;
  present: boolean;
}

export const DIVISIONS: Division[] = [
  "No Division",
  "Machine Learning",
  "Cyber Security",
  "Front-End Development",
  "Back-End Development",
  "UI/UX",
  "Game Development",
  "Mobile Development",
  "Public Relation",
  "Project Management",
  "Community Development",
  "Videography",
  "Copywriting",
  "Creative Design",
];

export const MEMBER_ROLES: MemberRole[] = ["Member", "Core Team", "Executive"];
export const MEMBER_STATUSES: MemberStatus[] = ["Active", "Non-Active"];
export const EVENT_TYPES: EventType[] = ["Offline", "Online"];
export const EVENT_STATUSES: EventStatus[] = ["Pending", "On Going", "Done"];
