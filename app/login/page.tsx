"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { form, isLoading, handleLogin } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <LoginHeader />
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm form={form} onSubmit={handleLogin} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
