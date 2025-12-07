import { Shield, CheckCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { User } from "firebase/auth";

interface ProfileCardStatsProps {
  user: User;
}

export default function ProfileCardStats({ user }: ProfileCardStatsProps) {
  const creationTime = user.metadata.creationTime
    ? new Date(user.metadata.creationTime)
    : new Date();

  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-6">
      {/* Role */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Role
          </p>
          <Badge className="mt-1">Admin</Badge>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/10 hover:border-success/30 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Status
          </p>
          <Badge variant="success" className="mt-1">
            Active
          </Badge>
        </div>
      </div>

      {/* Member Since */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/10 hover:border-warning/30 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
          <Calendar className="h-6 w-6 text-warning" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Member Since
          </p>
          <p className="font-semibold text-foreground text-sm mt-1">
            {creationTime.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
