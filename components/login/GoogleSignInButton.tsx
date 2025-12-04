import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/login/GoogleIcon";

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function GoogleSignInButton({
  onClick,
  isLoading,
}: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon className="mr-2 h-4 w-4" />
      )}
      Sign in with Google
    </Button>
  );
}
