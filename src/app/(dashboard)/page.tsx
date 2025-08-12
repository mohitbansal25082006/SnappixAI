"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-500">Redirecting...</p>
    </div>
  );
}
