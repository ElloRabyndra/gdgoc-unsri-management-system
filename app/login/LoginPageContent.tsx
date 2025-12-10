"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export function LoginPageContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const { form, isLoading, handleLogin } = useAuth(returnUrl);

  return (
    <Card className="w-full max-w-md shadow-xl animate-fade-in bg-transparent border-none">
      <CardHeader className="text-center space-y-4 pb-2">
        <LoginHeader />
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <LoginForm form={form} onSubmit={handleLogin} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
