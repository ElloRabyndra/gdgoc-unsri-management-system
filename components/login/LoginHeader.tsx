import Image from "next/image";
import { CardTitle, CardDescription } from "@/components/ui/card";

export function LoginHeader() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg relative">
          <Image
            src="/icon_gdgoc.png"
            alt="GDGoC UNSRI Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="mt-1">
          Sign in to GDGoC UNSRI Management System
        </CardDescription>
      </div>
    </>
  );
}
