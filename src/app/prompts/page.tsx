"use client";

import { useMemo, useState } from "react";
import { prompts } from "../data/prompts";
import PromptCard from "../components/PromptCard";
import PromptHeader from "../components/PromptHeader";
import PromptFilters from "../components/PromptFilters";

const categories = [
  "ทั้งหมด",
  ...Array.from(new Set(prompts.map((p) => p.category))),
];

const tools = [
  "ทั้งหมด",
  ...Array.from(new Set(prompts.map((p) => p.tool))),
];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [activeTool, setActiveTool] = useState("ทั้งหมด");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      const matchCategory =
        activeCategory === "ทั้งหมด" || item.category === activeCategory;

      const matchTool =
        activeTool === "ทั้งหมด" || item.tool === activeTool;

      const keyword = search.toLowerCase().trim();

      const matchSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.tool.toLowerCase().includes(keyword) ||
        item.prompt.toLowerCase().includes(keyword);

      return matchCategory && matchTool && matchSearch;
    });
  }, [search, activeCategory, activeTool]);

  async function copyPrompt(text: string, id: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch {
      alert("คัดลอกไม่สำเร็จ กรุณาคัดลอกด้วยตนเอง");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <PromptHeader />

        <PromptFilters
          search={search}
          activeCategory={activeCategory}
          activeTool={activeTool}
          categories={categories}
          tools={tools}
          onSearchChange={setSearch}
          onCategoryChange={setActiveCategory}
          onToolChange={setActiveTool}
        />

        <p className="mt-6 text-sm text-slate-400">
          พบ {filteredPrompts.length} Prompt
        </p>

        {filteredPrompts.length === 0 ? (
          <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center backdrop-blur">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-4 text-2xl font-extrabold text-white">
              ไม่พบ Prompt ที่ค้นหา
            </h2>

            <p className="mt-2 text-slate-300">
              ลองใช้คำค้นหาอื่น เช่น แผนการสอน, ข้อสอบ, Kahoot, Google Flow
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                copiedId={copiedId}
                onCopy={copyPrompt}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}