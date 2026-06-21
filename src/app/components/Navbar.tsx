export default function Navbar() {
  return (
    <nav className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="block">
          <h1 className="text-lg font-extrabold text-white">
            AI Prompt Toolkit
          </h1>

          <p className="text-xs text-emerald-200">
            for Muslim Educators 2026
          </p>
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-300 md:flex">
          <a href="/#features" className="hover:text-emerald-300">
            Features
          </a>

          <a href="/#tools" className="hover:text-emerald-300">
            AI Tools
          </a>

          <a href="/prompts" className="hover:text-emerald-300">
            Prompt Library
          </a>

          <a href="/evaluation" className="hover:text-emerald-300">
            แบบประเมิน
          </a>

          <a href="/dashboard" className="hover:text-emerald-300">
            Dashboard
          </a>

          <a href="/admin/prompts" className="hover:text-amber-300">
            Admin
          </a>

          <a
            href="/prompts"
            className="rounded-full bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-400"
          >
            เริ่มใช้งาน
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/prompts"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-400"
          >
            Prompt
          </a>

          <a
            href="/admin/prompts"
            className="rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200 hover:bg-amber-400/20"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
}