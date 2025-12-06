import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full bg-muted/30">
        <Sidebar />
        <div className="flex flex-1 flex-col lg:ml-64">
          <Navbar />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
