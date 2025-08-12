"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // change to your target route
    router.replace("/dashboard/dashboard");
  }, [router]);

  return <p>Redirecting...</p>;
}
