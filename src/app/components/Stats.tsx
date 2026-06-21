const stats = [
  ["200+", "Prompt พร้อมใช้"],
  ["20+", "หมวดหมู่"],
  ["AI", "เพื่อครูยุคใหม่"],
  ["2026", "Muslim Educators"],
];

export default function Stats() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([num, label]) => (
          <div
            key={label}
            className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
          >
            <div className="text-3xl font-extrabold text-emerald-300 md:text-4xl">
              {num}
            </div>
            <div className="mt-2 text-slate-300">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}