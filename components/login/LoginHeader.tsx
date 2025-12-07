import Image from "next/image";
import { CardTitle, CardDescription } from "@/components/ui/card";

export function LoginHeader() {
  return (
    <>
      <div className="flex justify-center lg:hidden">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl p-2 shadow-lg relative animate-float">
          <Image
            src="/icon_gdgoc.png"
            alt="GDGoC UNSRI Logo"
            fill
            className="object-contain p-2"
          />
        </div>
      </div>
      <div className="space-y-2 -mt-4 lg:mt-0">
        <CardTitle className="text-3xl font-bold ">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to access your dashboard
        </CardDescription>
      </div>
    </>
  );
}
