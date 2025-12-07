import { Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { User } from "firebase/auth";

interface ProfileCardMetaProps {
  user: User;
}

export default function ProfileCardMeta({ user }: ProfileCardMetaProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-border">
      {/* Email Verified */}
      <div className="flex items-center gap-3 p-3 rounded-lg border">
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

      {/* Last Sign-In */}
      <div className="flex items-center gap-3 p-3 rounded-lg border">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">Last Sign-In</p>
          <p className="text-sm font-semibold text-foreground mt-1">
            {user.metadata.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
