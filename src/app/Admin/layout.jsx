"use client";

import Header from "@/components/commom/Header";
import Sidebar from "@/components/commom/Sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else if (user?.publicMetadata?.role !== "admin") {
        router.push("/"); // redirect normal users to homepage
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // ✅ Loading state while Clerk fetches user
  if (!isLoaded) {
    return (
      <div className="flex justify-center min-h-screen items-center space-x-1 text-sm text-gray-500 mt-4">
        <span className="animate-bounce h-5 w-5 bg-gray-600 rounded-full">.</span>
        <span className="animate-bounce h-5 w-5 bg-gray-600 rounded-full [animation-delay:.2s]">.</span>
        <span className="animate-bounce h-5 w-5 bg-gray-600 rounded-full [animation-delay:.4s]">.</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header stays fixed */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main content with proper overflow handling */}
        <main className="flex-1 bg-gray-100 overflow-hidden">
          <div className="h-full p-4 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
