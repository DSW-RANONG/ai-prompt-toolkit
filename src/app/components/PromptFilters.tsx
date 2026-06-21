type PromptFiltersProps = {
  search: string;
  activeCategory: string;
  activeTool: string;
  categories: string[];
  tools: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onToolChange: (value: string) => void;
};

export default function PromptFilters({
  search,
  activeCategory,
  activeTool,
  categories,
  tools,
  onSearchChange,
  onCategoryChange,
  onToolChange,
}: PromptFiltersProps) {
  return (
    <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ค้นหา Prompt เช่น แผนการสอน, Kahoot, Google Flow..."
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400"
      />

      <div className="mt-5">
        <p className="mb-2 text-sm font-bold text-emerald-200">หมวดหมู่</p>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === category
                  ? "bg-emerald-500 text-white"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-bold text-amber-200">เครื่องมือ AI</p>

        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <button
              key={tool}
              onClick={() => onToolChange(tool)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeTool === tool
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}