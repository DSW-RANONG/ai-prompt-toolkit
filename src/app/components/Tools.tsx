import React from "react";

const tools = [
  {
    icon: "💬",
    name: "ChatGPT",
    description: "ช่วยเขียนแผนการสอน ใบงาน ข้อสอบ และสื่อการเรียนรู้",
    tag: "Text AI",
  },
  {
    icon: "✨",
    name: "Gemini",
    description: "ช่วยคิด วิเคราะห์ สรุป และสร้างเนื้อหาสำหรับครู",
    tag: "Google AI",
  },
  {
    icon: "🎬",
    name: "Google Flow",
    description: "สร้าง Prompt สำหรับวิดีโอการศึกษาและสื่อสร้างสรรค์",
    tag: "Video AI",
  },
  {
    icon: "🎙️",
    name: "ElevenLabs",
    description: "สร้างเสียงพากย์ บทพูด และเสียงประกอบการสอน",
    tag: "Voice AI",
  },
  {
    icon: "📚",
    name: "NotebookLM",
    description: "สรุปเอกสาร สร้างคู่มือ และคำถามจากเนื้อหาบทเรียน",
    tag: "Research AI",
  },
  {
    icon: "🎨",
    name: "Canva / Image AI",
    description: "สร้างภาพประกอบ อินโฟกราฟิก และสื่อประชาสัมพันธ์",
    tag: "Design AI",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      
      {/* แสง Glow พื้นหลังสำหรับ Section Tools */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]"></div>

      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {/* Badge สไตล์กะพริบแบบหน้า Hero แต่เป็นโทนสี Amber */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-extrabold text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
            AI Tools
          </div>

          <h2 className="mt-6 text-3xl font-black text-white md:text-4xl lg:text-5xl">
            เครื่องมือที่<span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">รองรับ</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            คลัง Prompt นี้ออกแบบให้ครูนำไปใช้กับเครื่องมือ AI หลากหลายประเภท
            ทั้งข้อความ ภาพ เสียง วิดีโอ และการสรุปเอกสาร
          </p>
        </div>

        {/* ปุ่ม CTA สไตล์เดียวกับ Hero เพื่อความสม่ำเสมอ */}
        <a 
          href="/prompts" 
          className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
          ดู Prompt ทั้งหมด
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.name}
            className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_15px_40px_-15px_rgba(251,191,36,0.2)] hover:border-amber-500/30"
          >
            {/* พื้นหลัง Gradient ซ่อนอยู่ จะแสดงตอน Hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="flex items-start justify-between gap-4">
              {/* กล่องไอคอน */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-slate-800/50 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-500/30 group-hover:bg-amber-500/10">
                {tool.icon}
              </div>

              {/* Tag / Badge */}
              <span className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 transition-colors group-hover:bg-amber-400/20">
                {tool.tag}
              </span>
            </div>

            <h3 className="mt-6 text-xl font-black text-white transition-colors group-hover:text-amber-300">
              {tool.name}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
              {tool.description}
            </p>

            {/* เส้นขีดตกแต่งด้านล่างการ์ดแบบเดียวกับหน้า Stats แต่เป็นสี Amber */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500 group-hover:w-full"></div>
          </article>
        ))}
      </div>
    </section>
  );
}