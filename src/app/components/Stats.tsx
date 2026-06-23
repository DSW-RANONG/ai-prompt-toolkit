import React from "react";

// เพิ่ม Icon เข้าไปในข้อมูลเพื่อให้การ์ดดูมีมิติและสื่อความหมายมากขึ้น
const stats = [
  {
    value: "10+",
    label: "Prompt พร้อมใช้",
    description: "เริ่มต้นใช้งานได้ทันที",
    icon: "✨",
  },
  {
    value: "6",
    label: "เครื่องมือ AI",
    description: "ChatGPT, Gemini, Flow และอื่น ๆ",
    icon: "🤖",
  },
  {
    value: "100%",
    label: "เน้นงานครู",
    description: "ออกแบบเพื่อการสอนจริง",
    icon: "🎯",
  },
  {
    value: "24/7",
    label: "เข้าถึงออนไลน์",
    description: "ใช้งานได้ทุกที่ทุกเวลา",
    icon: "🌍",
  },
];

export default function Stats() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-12 md:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.3)] hover:border-emerald-500/30"
          >
            {/* แสง Glow จางๆ ที่มุมขวาบนของการ์ดแต่ละใบ */}
            <div className="absolute -right-6 -top-6 z-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-300 group-hover:bg-emerald-500/20"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                {/* ตัวเลขสถิติ พร้อมลูกเล่น Gradient ตอน Hover */}
                <p className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 transition-all duration-300 group-hover:from-emerald-300 group-hover:to-teal-100">
                  {item.value}
                </p>
                
                {/* ไอคอน */}
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/5 bg-slate-800/50 text-xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                  {item.icon}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold tracking-wide text-emerald-100/90 transition-colors duration-300 group-hover:text-emerald-300">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* เส้นขีดตกแต่งด้านล่างการ์ด (Bottom Highlight Line) */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}