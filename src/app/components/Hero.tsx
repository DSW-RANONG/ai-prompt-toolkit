export default function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
        AI Prompt Toolkit 2026
      </div>

      <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
        AI Prompt Toolkit
        <br />
        <span className="bg-gradient-to-r from-emerald-300 via-white to-amber-300 bg-clip-text text-transparent">
          for Muslim Educators
        </span>
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-2xl">
        คลัง Prompt สำหรับครูโรงเรียนบูรณาการอิสลาม
        ช่วยสร้างแผนการสอน ข้อสอบ เกม สื่อการสอน วิดีโอ
        และเสียงพากย์ด้วย AI
      </p>

<div className="mt-10 flex flex-wrap gap-4">
  <a
    href="/prompts"
    className="rounded-2xl bg-emerald-500 px-7 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
  >
    เริ่มใช้งาน
  </a>

  <a
    href="/prompts"
    className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-lg font-bold text-white backdrop-blur hover:bg-white/20"
  >
    ดู Prompt ทั้งหมด
  </a>
</div>
    </section>
  );
}