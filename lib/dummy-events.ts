import { type Event } from "@/types/index"

export const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning Workshop",
    date: new Date("2024-12-15"),
    type: "Offline",
    status: "On Going",
    description:
      "A comprehensive workshop introducing the fundamentals of machine learning, covering supervised and unsupervised learning techniques with hands-on Python exercises.",
    committee: ["1", "3", "4"],
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    date: new Date("2024-12-20"),
    type: "Online",
    status: "Pending",
    description:
      "An intensive online bootcamp covering modern web development technologies including React, TypeScript, and Tailwind CSS.",
    committee: ["2", "3", "6"],
  },
  {
    id: "3",
    title: "UI/UX Design Sprint",
    date: new Date("2024-11-25"),
    type: "Offline",
    status: "Done",
    description:
      "A collaborative design sprint where participants learn to create user-centered designs using Figma and design thinking methodologies.",
    committee: ["4", "6", "8"],
  },
  {
    id: "4",
    title: "Cybersecurity Awareness Seminar",
    date: new Date("2024-12-28"),
    type: "Online",
    status: "Pending",
    description:
      "An educational seminar on cybersecurity best practices, covering topics like password security, phishing prevention, and secure coding.",
    committee: ["5", "3", "7"],
  },
  {
    id: "5",
    title: "GDGoC UNSRI Annual Meetup 2024",
    date: new Date("2024-11-10"),
    type: "Offline",
    status: "Done",
    description:
      "The annual gathering of all GDGoC UNSRI members featuring networking, project showcases, and planning for the upcoming year.",
    committee: ["1", "2", "3", "4", "7", "8"],
  },
];
