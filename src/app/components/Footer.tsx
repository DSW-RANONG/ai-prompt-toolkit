export default function Footer() {
  return (
    <footer
      id="about"
      className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-6 py-10 text-slate-400"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            อาจารย์อารอฟัต สาลี
          </h2>
          <p className="mt-2">
            ICT Officer • AI Trainer • Educational Technology Developer
          </p>
        </div>

        <div className="md:text-right">
          <p>AI Prompt Toolkit for Muslim Educators 2026</p>
          <p className="mt-1 text-sm">
            ใช้ AI อย่างมีปัญญา เพื่อพัฒนาผู้เรียน
          </p>
        </div>
      </div>
    </footer>
  );
}