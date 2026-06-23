import React from "react";

export default function PromptHeader() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-10 md:px-6 md:pt-16">
      
      {/* --- Ambient Glow Background --- */}
      <div className="absolute top-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-[120px]"></div>
      <div className="absolute bottom-0 right-10 -z-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px]"></div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl shadow-2xl md:p-10">
        
        {/* ลวดลายตกแต่งพื้นหลังของการ์ด (Subtle Grid) */}
        <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          
          {/* --- Left Column: Main Info --- */}
          <div className="relative z-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-extrabold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              AI Prompt Library
            </div>

            {/* Title with Gradient */}
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              คลัง Prompt <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent drop-shadow-sm">
                สำหรับครูยุคใหม่
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              รวม Prompt สำเร็จรูปสำหรับสร้างแผนการสอน ใบงาน ข้อสอบ 
              สื่อการเรียนรู้ บทพากย์ วิดีโอ และกิจกรรม Active Learning 
              เพื่อช่วยให้ครูทำงานได้เร็วขึ้นและมีคุณภาพมากขึ้น
            </p>

            {/* Feature Badges (Pills) */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-200 transition-colors hover:bg-emerald-500/20">
                <span className="text-emerald-400">⚡</span> ใช้งานได้ทันที
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-200 transition-colors hover:bg-amber-500/20">
                <span className="text-amber-400">🎯</span> เหมาะสำหรับครู
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 text-xs font-bold text-sky-200 transition-colors hover:bg-sky-500/20">
                <span className="text-sky-400">🤖</span> รองรับหลายเครื่องมือ AI
              </span>
            </div>
          </div>

          {/* --- Right Column: How to use Card --- */}
          <div className="group relative rounded-3xl border border-white/5 bg-slate-950/40 p-6 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 hover:bg-slate-950/60 md:p-8">
            
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                ✨
              </div>
              <h2 className="text-xl font-black text-white">วิธีใช้งาน</h2>
            </div>

            <div className="mt-6 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-300">
                  1
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-300 transition-colors group-hover:text-white">
                  เลือกหมวดหมู่หรือเครื่องมือ AI
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-300">
                  2
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-300 transition-colors group-hover:text-white">
                  กดดูรายละเอียด Prompt
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-300">
                  3
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-300 transition-colors group-hover:text-white">
                  คัดลอก Prompt ไปใช้กับ ChatGPT, Gemini หรือเครื่องมืออื่น ๆ
                </p>
              </div>
            </div>

            {/* Decorative Gradient Line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500 group-hover:w-full"></div>
          </div>

        </div>
      </div>
    </section>
  );
}