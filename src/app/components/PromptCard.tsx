import React from "react";

export type PromptCardItem = {
  id: number;
  title: string;
  category: string;
  tool: string;
  description: string;
  prompt: string;
  level?: string | null;
  subject?: string | null;
  tags?: string[] | null;
  copy_count?: number;
};

type PromptCardProps = {
  item: PromptCardItem;
  onCopy: (item: PromptCardItem) => void;
};

export default function PromptCard({ item, onCopy }: PromptCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/30 hover:bg-white/10 hover:shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)]">
      
      {/* แสง Glow จางๆ ภายในการ์ด (แสดงตอน Hover) */}
      <div className="absolute -top-24 -right-24 z-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-[80px] transition-all duration-500 group-hover:bg-emerald-500/20"></div>

      <div className="relative z-10">
        {/* --- Top Badges --- */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {item.category}
          </span>
          <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            {item.tool}
          </span>
        </div>

        {/* --- Title & Description --- */}
        <h2 className="mt-5 line-clamp-2 text-xl font-black leading-snug text-white transition-colors duration-300 group-hover:text-emerald-300">
          {item.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {item.description}
        </p>

        {/* --- Metadata Chips (Level, Subject, Copy) --- */}
        <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-slate-300">
          {item.level && (
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-black/30 px-3 py-1.5 shadow-inner">
              <span className="text-emerald-400">🎓</span> {item.level}
            </div>
          )}

          {item.subject && (
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-black/30 px-3 py-1.5 shadow-inner">
              <span className="text-amber-400">📚</span> {item.subject}
            </div>
          )}

          <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-black/30 px-3 py-1.5 shadow-inner">
            <span className="text-teal-400">📋</span> Copy: {item.copy_count || 0}
          </div>
        </div>

        {/* --- Tags --- */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* --- Action Buttons --- */}
      <div className="relative z-10 mt-auto flex gap-3 pt-6">
        <a
          href={`/prompts/${item.id}`}
          className="flex-1 rounded-full border border-slate-700 bg-slate-800/50 py-2.5 text-center text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
        >
          รายละเอียด
        </a>

        <button
          onClick={() => onCopy(item)}
          className="group/btn relative flex-1 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 py-2.5 text-center text-sm font-extrabold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover/btn:opacity-100"></span>
          <span className="flex items-center justify-center gap-2">
            คัดลอก
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </span>
        </button>
      </div>

      {/* เส้นขีดตกแต่งด้านล่างการ์ด (ให้ล้อกับหน้า Stats และ Tools) */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full"></div>
    </article>
  );
}