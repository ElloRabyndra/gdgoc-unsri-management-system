"use client";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";

export function ProfileCard() {
  const { user } = useAuthContext();

  if (!user) return null;

  // Extract user information
  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const email = user.email || "";
  const creationTime = user.metadata.creationTime
    ? new Date(user.metadata.creationTime)
    : new Date();

    console.log(user)

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold">{displayName}</h3>
              <p className="text-muted-foreground break-all">{email}</p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <Badge variant="default">Admin</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <User className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Calendar className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground text-sm">
                  {creationTime.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional User Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
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

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Last Sign In</p>
                <p className="text-sm font-medium">
                  {user.metadata.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString(
                        "en-US"
                      )
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
