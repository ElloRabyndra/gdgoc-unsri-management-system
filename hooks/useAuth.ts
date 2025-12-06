import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/user-not-found":
          toast.error("User not found");
          break;
        case "auth/wrong-password":
          toast.error("Invalid password");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid email or password");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later");
          break;
        default:
          toast.error("Login failed. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return {
    form,
    isLoading,
    handleLogin,
    handleLogout,
  };
}
