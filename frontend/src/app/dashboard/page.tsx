"use client";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const logout = async () => {
    await api.post("/auth/logout");

    router.push("/login");
  };

  return (
    <main className="min-h-screen p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </main>
  );
}