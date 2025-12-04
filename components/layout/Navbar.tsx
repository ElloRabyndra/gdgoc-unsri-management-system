import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  return (
    <header className="bg-sidebar sticky top-0 z-30 flex h-16 items-center justify-end border-b border-border px-6 lg:px-8">
      {/* Spacer for mobile menu button */}
      <div className="lg:hidden w-10 absolute left-4" />

      {/* User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-none">Admin User</span>
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-border">
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
