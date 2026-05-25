"use client";

import Turnstile from "react-turnstile";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post(
        "/auth/login",
        {
          ...data,
          turnstileToken
        }
      );
      toast.success(response.data.message);
      localStorage.setItem(
        "email",
        data.email
      );
      router.push("/verify-otp");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
    if (!turnstileToken) {
      toast.error("Please verify you are human");
      return;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("email")}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("password")}
            />
          </div>

          <Turnstile
            sitekey={
              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
            }
            onVerify={(token) => {
              setTurnstileToken(token);
            }}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}