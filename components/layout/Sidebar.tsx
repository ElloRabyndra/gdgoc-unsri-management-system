"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CheckSquare,
  User,
  LogOut,
  Menu,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Members", href: "/members", icon: Users },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { title: "Attendance", href: "/attendance", icon: CheckSquare },
  { title: "Profile", href: "/profile", icon: User },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const { handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button - Only show hamburger when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 h-screen w-64 transform bg-sidebar transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg relative">
                <Image
                  src="/icon_gdgoc.png"
                  alt="GDGoC UNSRI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-foreground">
                GDGoC UNSRI
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4 border-r border-border">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="shrink-0 border-t border-r border-border p-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-success/10 hover:text-success w-full"
              >
                <LogIn className="h-5 w-5" />
                Login
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
