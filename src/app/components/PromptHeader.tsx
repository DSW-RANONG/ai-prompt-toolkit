export default function PromptHeader() {
  return (
    <div className="relative z-10">
      <a
        href="/"
        className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
      >
        ← กลับหน้าแรก
      </a>

      <div className="mt-8">
        <div className="inline-flex rounded-full border border-emerald-400/30 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
          Prompt Library
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          คลัง Prompt สำหรับครู
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
          รวม Prompt พร้อมใช้สำหรับสร้างแผนการสอน ข้อสอบ เกม สื่อการสอน
          วิดีโอ และเสียงพากย์ด้วย AI
        </p>
      </div>
    </div>
  );
}