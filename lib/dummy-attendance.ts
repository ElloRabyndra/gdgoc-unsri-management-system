import { type Attendance } from "@/types/index"

export const dummyAttendance: Attendance[] = [
  // Event 1 - ML Workshop
  { memberId: "1", eventId: "1", present: true },
  { memberId: "2", eventId: "1", present: true },
  { memberId: "3", eventId: "1", present: true },
  { memberId: "4", eventId: "1", present: true },
  { memberId: "5", eventId: "1", present: false },
  { memberId: "6", eventId: "1", present: true },
  { memberId: "7", eventId: "1", present: true },
  { memberId: "8", eventId: "1", present: false },
  { memberId: "9", eventId: "1", present: false },
  { memberId: "10", eventId: "1", present: true },

  // Event 2 - Web Dev Bootcamp
  { memberId: "1", eventId: "2", present: true },
  { memberId: "2", eventId: "2", present: true },
  { memberId: "3", eventId: "2", present: true },
  { memberId: "4", eventId: "2", present: false },
  { memberId: "5", eventId: "2", present: false },
  { memberId: "6", eventId: "2", present: true },
  { memberId: "7", eventId: "2", present: true },
  { memberId: "8", eventId: "2", present: true },
  { memberId: "9", eventId: "2", present: false },
  { memberId: "10", eventId: "2", present: true },

  // Event 3 - UI/UX Design Sprint
  { memberId: "1", eventId: "3", present: false },
  { memberId: "2", eventId: "3", present: true },
  { memberId: "3", eventId: "3", present: true },
  { memberId: "4", eventId: "3", present: true },
  { memberId: "5", eventId: "3", present: false },
  { memberId: "6", eventId: "3", present: true },
  { memberId: "7", eventId: "3", present: false },
  { memberId: "8", eventId: "3", present: true },
  { memberId: "9", eventId: "3", present: false },
  { memberId: "10", eventId: "3", present: true },

  // Event 4 - Cybersecurity Seminar
  { memberId: "1", eventId: "4", present: true },
  { memberId: "2", eventId: "4", present: false },
  { memberId: "3", eventId: "4", present: true },
  { memberId: "4", eventId: "4", present: true },
  { memberId: "5", eventId: "4", present: true },
  { memberId: "6", eventId: "4", present: false },
  { memberId: "7", eventId: "4", present: true },
  { memberId: "8", eventId: "4", present: true },
  { memberId: "9", eventId: "4", present: true },
  { memberId: "10", eventId: "4", present: false },

  // Event 5 - Annual Meetup
  { memberId: "1", eventId: "5", present: true },
  { memberId: "2", eventId: "5", present: true },
  { memberId: "3", eventId: "5", present: true },
  { memberId: "4", eventId: "5", present: true },
  { memberId: "5", eventId: "5", present: false },
  { memberId: "6", eventId: "5", present: true },
  { memberId: "7", eventId: "5", present: true },
  { memberId: "8", eventId: "5", present: true },
  { memberId: "9", eventId: "5", present: false },
  { memberId: "10", eventId: "5", present: true },
];
