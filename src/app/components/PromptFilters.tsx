import React from "react";

type PromptFiltersProps = {
  searchTerm: string;
  selectedCategory: string;
  selectedTool: string;
  categories: string[];
  tools: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onToolChange: (value: string) => void;
  onClearFilters: () => void;
};

export default function PromptFilters({
  searchTerm,
  selectedCategory,
  selectedTool,
  categories,
  tools,
  onSearchChange,
  onCategoryChange,
  onToolChange,
  onClearFilters,
}: PromptFiltersProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-8 md:px-6">
      
      {/* แสง Glow จางๆ รองพื้นหลังกล่อง Filter */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-32 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]"></div>

      <div className="relative rounded-[2rem] border border-white/5 bg-white/5 p-5 backdrop-blur-xl shadow-2xl md:p-6">
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
          
          {/* --- Search Input --- */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
              ค้นหา Prompt
            </label>
            <div className="relative mt-2">
              <svg 
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ค้นหาชื่อ Prompt, คำอธิบาย, วิชา..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all hover:border-white/20 focus:border-emerald-500 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* --- Category Select --- */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
              หมวดหมู่
            </label>
            <div className="relative mt-2">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/50 py-3.5 pl-4 pr-10 text-sm text-white outline-none transition-all hover:border-white/20 focus:border-emerald-500 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
              >
                <option value="ทั้งหมด" className="bg-slate-800 text-white">ทั้งหมด</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-800 text-white">
                    {category}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* --- Tool Select --- */}
          <div>
            {/* ใช้สี Amber เพื่อแยกความแตกต่างว่าเป็นตัวกรองเครื่องมือ */}
            <label className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90">
              เครื่องมือ AI
            </label>
            <div className="relative mt-2">
              <select
                value={selectedTool}
                onChange={(e) => onToolChange(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/50 py-3.5 pl-4 pr-10 text-sm text-white outline-none transition-all hover:border-white/20 focus:border-amber-500 focus:bg-slate-900 focus:ring-4 focus:ring-amber-500/20"
              >
                <option value="ทั้งหมด" className="bg-slate-800 text-white">ทั้งหมด</option>
                {tools.map((tool) => (
                  <option key={tool} value={tool} className="bg-slate-800 text-white">
                    {tool}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* --- Clear Filters Button --- */}
          <button
            onClick={onClearFilters}
            className="group flex h-[50px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-slate-300 transition-all duration-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95"
          >
            {/* ไอคอนหมุน (Rotate Animation) ตอน Hover */}
            <svg 
              className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            ล้างตัวกรอง
          </button>
        </div>
      </div>
    </section>
  );
}