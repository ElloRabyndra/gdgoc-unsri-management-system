"use client";
import { User, Mail, Shield, Calendar, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";

export function ProfileCard() {
  const { user } = useAuthContext();

  if (!user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const email = user.email || "";
  const creationTime = user.metadata.creationTime
    ? new Date(user.metadata.creationTime)
    : new Date();

  return (
    <Card className="animate-fade-in overflow-hidden">
      {/* Header Banner */}
      <div className="h-24" />

      <CardContent className="relative px-6 pb-6">
        {/* Avatar - positioned to overlap banner */}
        <div className="flex flex-col items-center -mt-16 mb-6">
          <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
            <AvatarFallback className="bg-primary/10 text-primary text-3xl">
              <User className="h-14 w-14" />
            </AvatarFallback>
          </Avatar>
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-foreground">{displayName}</h3>
            <p className="text-muted-foreground break-all mt-1">{email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Role</p>
              <Badge variant="default" className="mt-1">Admin</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/10 hover:border-success/30 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
              <Badge variant="success" className="mt-1">Active</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/10 hover:border-warning/30 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
              <Calendar className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Member Since</p>
              <p className="font-semibold text-foreground text-sm mt-1">
                {creationTime.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg  border">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email Verified</p>
              <Badge
                variant={user.emailVerified ? "success" : "warning"}
                className="mt-1"
              >
                {user.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg  border">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last Sign In</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {user.metadata.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
