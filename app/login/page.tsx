"use client";

import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginDecoration } from "@/components/login/LoginDecoration";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";
import { LoginPageContent } from "./LoginPageContent";

export default function Login() {
  const { form, isLoading, handleLogin } = useAuth();

  return (
    <PublicRoute>
      <div className="min-h-screen grid lg:grid-cols-2">
        <LoginDecoration />
        <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
          <Suspense
            fallback={
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </div>
            }
          >
            <LoginPageContent />
          </Suspense>
        </div>
      </div>
    </PublicRoute>
  );
}
