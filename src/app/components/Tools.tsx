const tools = [
  "ChatGPT",
  "Gemini",
  "NotebookLM",
  "Claude",
  "Google Flow",
  "ElevenLabs",
  "Canva",
  "Gamma",
  "Kahoot",
  "Quizizz",
];

export default function Tools() {
  return (
    <section id="tools" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          เครื่องมือ AI ที่ครูจะได้ใช้
        </h2>

        <p className="mt-3 max-w-3xl text-slate-300">
          รวมเครื่องมือสำคัญสำหรับครู ตั้งแต่การเขียนแผนการสอน
          การสร้างสื่อ ไปจนถึงเกมและวิดีโอการศึกษา
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-emerald-100"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}