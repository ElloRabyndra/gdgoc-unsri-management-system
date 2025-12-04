import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Login successful!");
    router.push("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    // Simulate Google sign-in delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGoogleLoading(false);
    toast.success("Google sign-in successful!");
    router.push("/dashboard");
  };

  return {
    form,
    isLoading,
    isGoogleLoading,
    handleLogin,
    handleGoogleSignIn,
  };
}
