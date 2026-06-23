import React from "react";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      
      {/* --- Decorative Background Glows (ดวงไฟเรืองแสงพื้นหลัง) --- */}
      <div className="absolute top-1/4 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-10 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]"></div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        
        {/* --- Left Column: Main Content --- */}
        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-extrabold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            AI Teacher Hub 2026
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            เครื่องมือ AI สำหรับครู
            <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
              สร้างสื่อการสอนได้เร็วขึ้น
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            รวมคลัง Prompt และเครื่องมือช่วยครูในการสร้างแผนการสอน ใบงาน
            ข้อสอบ กิจกรรม Active Learning บทพากย์ และ Prompt สำหรับสร้างวิดีโอ
            เพื่อให้ครูทำงานได้เป็นระบบ ประหยัดเวลา และนำไปใช้ได้จริง
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a 
              href="/prompts" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
              เปิดคลัง Prompt
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a 
              href="/evaluation" 
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              ทำแบบประเมิน
            </a>

            <a 
              href="/dashboard" 
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              ดู Dashboard
            </a>
          </div>

          {/* Mini Features */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <MiniFeature icon="⚡" title="เร็วขึ้น" text="ลดเวลาการเตรียมงาน" />
            <MiniFeature icon="🎯" title="ตรงงานครู" text="ออกแบบเพื่อการสอน" />
            <MiniFeature icon="✨" title="ใช้ง่าย" text="คัดลอกแล้วใช้ได้ทันที" />
          </div>
        </div>

        {/* --- Right Column: Visual Workflow --- */}
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-md md:p-8">
          
          <div className="rounded-3xl border border-white/5 bg-slate-950/50 p-6 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Today Workflow
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">ครูใช้ AI อย่างเป็นระบบ</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-3xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                🤖
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <StepItem number="01" title="เลือกงานที่ต้องทำ" text="แผนการสอน ใบงาน ข้อสอบ หรือสื่อ" />
              <StepItem number="02" title="คัดลอก Prompt" text="เลือก Prompt ที่เหมาะกับรายวิชา" />
              <StepItem number="03" title="ปรับข้อมูลบทเรียน" text="ใส่ระดับชั้น เวลาเรียน และหัวข้อ" />
              <StepItem number="04" title="ตรวจทานก่อนใช้จริง" text="ปรับภาษาและความเหมาะสมกับนักเรียน" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 transition-all hover:bg-emerald-500/20">
              <p className="text-3xl font-black text-white">10<span className="text-emerald-400">+</span></p>
              <p className="mt-1 text-sm font-medium text-emerald-200">Prompt เริ่มต้น</p>
            </div>

            <div className="group rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 transition-all hover:bg-amber-500/20">
              <p className="text-3xl font-black text-white">5</p>
              <p className="mt-1 text-sm font-medium text-amber-200">หมวดงานครูหลัก</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Sub Components ---

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:shadow-lg">
      <div className="text-2xl transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <h3 className="mt-3 text-sm font-black text-white">{title}</h3>
      <p className="mt-1 text-xs text-slate-400 transition-colors group-hover:text-slate-300">{text}</p>
    </div>
  );
}

function StepItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group flex cursor-pointer gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:translate-x-2 hover:border-emerald-500/30 hover:bg-white/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-xs font-black text-slate-300 transition-colors group-hover:border-emerald-500/50 group-hover:text-emerald-400">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-black text-white transition-colors group-hover:text-emerald-300">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{text}</p>
      </div>
    </div>
  );
}