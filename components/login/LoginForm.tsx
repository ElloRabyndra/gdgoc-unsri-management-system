import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormValues } from "@/hooks/useAuth";

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void;
  isLoading: boolean;
}

export function LoginForm({ form, onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-medium">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12  border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-medium">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-12  border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-google-blue to-google-blue hover:opacity-90 transition-opacity shadow-lg shadow-google-blue/25"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Sign In
        </Button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          GDGoC UNSRI Admin Portal
        </p>
      </form>
    </Form>
  );
}
