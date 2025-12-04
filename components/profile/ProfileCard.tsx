import { User, Mail, Shield, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export function ProfileCard() {
  // Dummy profile data
  const profile = {
    name: "Admin User",
    email: "admin@gdgoc-unsri.org",
    role: "Executive",
    division: "Project Management",
    joinDate: new Date("2023-06-01"),
    status: "Active",
  };
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
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.email}</p>
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
                <Badge variant="default">{profile.role}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <User className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="success">{profile.status}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Calendar className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">
                  {profile.joinDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
