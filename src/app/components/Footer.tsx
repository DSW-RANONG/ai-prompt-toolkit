import React from "react";

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 md:px-6">
      
      {/* แสง Glow จางๆ รองพื้นหลัง Footer เพื่อให้ไม่ดูมืดจนเกินไป */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-48 w-full -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]"></div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl md:p-10">
        
        {/* พื้นหลัง Gradient ภายในการ์ด */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          
          {/* --- Left Section: Brand & Creator --- */}
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
                AI Prompt Toolkit
              </h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              ระบบคลัง Prompt และเครื่องมือ AI สำหรับครู 
              เพื่อสนับสนุนการจัดการเรียนรู้ยุคใหม่ ให้การสอนเป็นเรื่องง่ายและประหยัดเวลา
            </p>

            {/* Creator Badge: ทำเป็นป้ายสวยๆ เรืองแสงนิดๆ เมื่อ Hover */}
            <div className="group mt-8 inline-block rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 transition-all duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/40">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">
                Developed By
              </p>
              <p className="mt-1 text-lg font-black text-white transition-colors group-hover:text-emerald-100">
                Arofat Salee
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-200/60">
                ICT Department • Damrongsart Wittaya School
              </p>
            </div>
          </div>

          {/* --- Right Section: Quick Links --- */}
          <div className="flex flex-col gap-4 md:items-end">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Links
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              <a href="/prompts" className="group relative text-sm font-medium text-slate-300 transition-colors hover:text-white">
                Prompt Library
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a href="/evaluation" className="group relative text-sm font-medium text-slate-300 transition-colors hover:text-white">
                แบบประเมิน
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a href="/dashboard" className="group relative text-sm font-medium text-slate-300 transition-colors hover:text-white">
                Dashboard
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a href="/admin/login" className="group relative text-sm font-medium text-slate-300 transition-colors hover:text-amber-400">
                Admin
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 AI Prompt Toolkit for Muslim Educators. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span className="text-emerald-500">❤</span> for Education
          </p>
        </div>
      </div>
    </footer>
  );
}