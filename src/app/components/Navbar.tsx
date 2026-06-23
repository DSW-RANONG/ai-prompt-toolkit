import React from "react";

export default function Navbar() {
  const menuItems = [
    {
      label: "หน้าแรก",
      href: "/",
    },
    {
      label: "คลัง Prompt",
      href: "/prompts",
    },
    {
      label: "แบบประเมิน",
      href: "/evaluation",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        
        {/* --- Logo Area --- */}
        <a href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/10 border border-emerald-400/30 text-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            ✨
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-sm font-black tracking-tight text-transparent md:text-base">
              AI Prompt Toolkit
            </h1>
            <p className="text-[11px] font-medium text-emerald-300/80">
              AI เพื่อครูยุคใหม่
            </p>
          </div>
        </a>

        {/* --- Desktop Menu --- */}
        <div className="hidden items-center gap-6 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
              {/* Sliding Underline Animation */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* --- Desktop CTA Buttons --- */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/admin/login?next=/dashboard"
            className="rounded-full border border-slate-700 bg-transparent px-5 py-2 text-sm font-bold text-slate-300 transition-all hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            Login
          </a>

          <a
            href="/prompts"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-2 text-sm font-extrabold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
            เริ่มใช้งาน
          </a>
        </div>

        {/* --- Mobile CTA Buttons --- */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/prompts"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 text-xs font-extrabold text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          >
            Prompt
          </a>

          <a
            href="/admin/login?next=/dashboard"
            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300"
          >
            Login
          </a>
        </div>
      </nav>

      {/* --- Mobile Scrollable Menu --- */}
      {/* ใช้ CSS พิเศษเพื่อซ่อน Scrollbar แต่ยังเลื่อนได้ */}
      <div className="border-t border-white/5 bg-slate-950/40 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/30"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}