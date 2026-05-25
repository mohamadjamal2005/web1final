"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const verifyOtp = async () => {
    const email =
      localStorage.getItem("email");

    try {
      const response = await api.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(response.data.message);

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="w-full border px-4 py-3 rounded-lg mb-5"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Verify
        </button>
      </div>
    </main>
  );
}