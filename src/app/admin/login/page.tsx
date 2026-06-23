"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

function AdminLoginContent() {
  const searchParams = useSearchParams();

  const rawNextPath = searchParams.get("next") || "/dashboard";
  const nextPath = rawNextPath.startsWith("/") ? rawNextPath : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      window.location.href = nextPath;
      return;
    }

    setIsLoading(false);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      alert("กรุณากรอกอีเมล");
      return;
    }

    if (!password.trim()) {
      alert("กรุณากรอกรหัสผ่าน");
      return;
    }

    setIsSigningIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSigningIn(false);

    if (error) {
      console.error(error);
      alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลหรือรหัสผ่าน");
      return;
    }

    window.location.href = nextPath;
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="glass-card w-full max-w-md rounded-3xl p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">
            🔐
          </div>

          <h1 className="mt-5 text-xl font-black">
            กำลังตรวจสอบสถานะ Login
          </h1>

          <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-white">
      <section className="glass-card w-full max-w-md rounded-3xl p-6 md:p-8">
        <a
          href="/"
          className="badge border border-white/10 bg-white/[0.06] text-emerald-200 hover:bg-white/10"
        >
          ← กลับหน้าแรก
        </a>

        <div className="mt-8">
          <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-extrabold text-amber-100">
            Admin Login
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
            เข้าสู่ระบบผู้ดูแล
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            กรุณาเข้าสู่ระบบก่อนเข้าใช้งานส่วนที่จำกัดสิทธิ์สำหรับผู้ดูแลระบบ
            หลังจากเข้าสู่ระบบสำเร็จ ระบบจะพาไปยังหน้าที่ต้องการโดยอัตโนมัติ
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-7 space-y-4">
          <div>
            <label className="text-xs font-bold text-emerald-200">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมล Admin"
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-emerald-200">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
            />
          </div>

          <button
            type="submit"
            disabled={isSigningIn}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningIn ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs leading-relaxed text-slate-400">
            หน้านี้เป็นประตูเข้าสู่ระบบ Admin เช่น Dashboard และระบบจัดการ Prompt
          </p>
        </div>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-4 text-white">
          <div className="glass-card w-full max-w-md rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">
              🔐
            </div>

            <h1 className="mt-5 text-xl font-black">
              กำลังโหลดหน้า Login
            </h1>

            <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่...</p>
          </div>
        </main>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}