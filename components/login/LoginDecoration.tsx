import Image from "next/image";

export function LoginDecoration() {
  return (
    <div className="hidden lg:flex relative overflow-hidden lg:bg-gradient-to-br from-google-blue via-google-blue to-google-green -mt-8">
      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-google-red/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-google-yellow/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
        <div className="relative w-44 h-44 animate-float">
          <Image
            src="/icon_gdgoc.png"
            alt="GDGoC UNSRI Logo"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center">GDGoC UNSRI</h1>
        <p className="text-xl text-white/90 text-center mb-4">
          Management System
        </p>

        <div className="max-w-sm text-center">
          <p className="text-white/80 leading-relaxed">
            Easily manage members, events, and attendance for the Google
            Developer Groups on Campus Universitas Sriwijaya community.
          </p>
        </div>
      </div>
    </div>
  );
}
