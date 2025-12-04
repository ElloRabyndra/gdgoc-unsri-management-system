"use client";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileCard } from "@/components/profile/ProfileCard";
export default function Profile() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileCard />
    </div>
  );
}
