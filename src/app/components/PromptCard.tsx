import type { PromptItem } from "../data/prompts";

type PromptCardProps = {
  item: PromptItem;
  copiedId: number | null;
  onCopy: (text: string, id: number) => void;
};

export default function PromptCard({
  item,
  copiedId,
  onCopy,
}: PromptCardProps) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.14]">
      <a href={`/prompts/${item.id}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
            {item.tool}
          </span>

          <span className="text-xs text-slate-400">{item.category}</span>
        </div>

        <h2 className="mt-4 text-xl font-extrabold hover:text-emerald-300">
          {item.title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {item.description}
        </p>

        <pre className="mt-4 max-h-56 overflow-hidden rounded-2xl bg-black/50 p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
          {item.prompt}
        </pre>
      </a>

      <div className="mt-4 flex gap-3">
        <a
          href={`/prompts/${item.id}`}
          className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-center font-extrabold text-white hover:bg-white/20"
        >
          ดูรายละเอียด
        </a>

        <button
          onClick={() => onCopy(item.prompt, item.id)}
          className="flex-1 rounded-2xl bg-emerald-500 px-5 py-3 font-extrabold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
        >
          {copiedId === item.id ? "คัดลอกแล้ว ✓" : "คัดลอก"}
        </button>
      </div>
    </div>
  );
}