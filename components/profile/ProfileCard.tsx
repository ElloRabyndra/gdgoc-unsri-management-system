"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";

import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCardStats from "./ProfileCardStats";
import ProfileCardMeta from "./ProfileCardMeta";

export function ProfileCard() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <Card className="animate-fade-in overflow-hidden">
      <div className="h-24" /> {/* Banner */}
      <CardContent className="relative px-6 pb-6">
        <ProfileCardHeader user={user} />
        <ProfileCardStats user={user} />
        <ProfileCardMeta user={user} />
      </CardContent>
    </Card>
  );
}
