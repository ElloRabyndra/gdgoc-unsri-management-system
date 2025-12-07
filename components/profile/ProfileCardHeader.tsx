import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import type { User } from "firebase/auth";

interface ProfileCardHeaderProps {
  user: User;
}

export default function ProfileCardHeader({ user }: ProfileCardHeaderProps) {
  const displayName =
    user.displayName || user.email?.split("@")[0] || "User";

  return (
    <div className="flex flex-col items-center -mt-16 mb-6">
      <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
        <AvatarFallback className="bg-primary/10 text-primary text-3xl">
          <UserIcon className="h-14 w-14" />
        </AvatarFallback>
      </Avatar>

      <div className="text-center mt-4">
        <h3 className="text-2xl font-bold text-foreground">{displayName}</h3>
        <p className="text-muted-foreground break-all mt-1">{user.email}</p>
      </div>
    </div>
  );
}
