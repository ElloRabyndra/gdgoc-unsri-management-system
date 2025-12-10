import { useAuthContext } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = (): boolean => {
    if (!user) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated: !!user,
    requireAuth,
  };
}
