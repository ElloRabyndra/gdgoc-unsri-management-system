"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginDecoration } from "@/components/login/LoginDecoration";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { form, isLoading, handleLogin } = useAuth();

  return (
    <PublicRoute>
      <div className="min-h-screen grid lg:grid-cols-2">
        <LoginDecoration />
        <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
          <Card className="w-full max-w-md shadow-xl animate-fade-in bg-transparent border-none">
            <CardHeader className="text-center space-y-4 pb-2">
              <LoginHeader />
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <LoginForm
                form={form}
                onSubmit={handleLogin}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicRoute>
  );
}
