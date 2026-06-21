"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PromptCard from "../components/PromptCard";
import PromptHeader from "../components/PromptHeader";
import PromptFilters from "../components/PromptFilters";

type PromptItem = {
  id: number;
  title: string;
  description: string | null;
  prompt_text: string;
  category: string;
  tool: string;
  level: string | null;
  subject: string | null;
  tags: string[] | null;
  is_published: boolean;
  copy_count: number;
  created_at: string;
};

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [activeTool, setActiveTool] = useState("ทั้งหมด");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("is_published", true)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("โหลดข้อมูล Prompt ไม่สำเร็จ");
      setIsLoading(false);
      return;
    }

    setPrompts(data || []);
    setIsLoading(false);
  }

  const categories = useMemo(() => {
    return [
      "ทั้งหมด",
      ...Array.from(new Set(prompts.map((p) => p.category))),
    ];
  }, [prompts]);

  const tools = useMemo(() => {
    return [
      "ทั้งหมด",
      ...Array.from(new Set(prompts.map((p) => p.tool))),
    ];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      const matchCategory =
        activeCategory === "ทั้งหมด" || item.category === activeCategory;

      const matchTool =
        activeTool === "ทั้งหมด" || item.tool === activeTool;

      const keyword = search.toLowerCase().trim();

      const matchSearch =
        item.title.toLowerCase().includes(keyword) ||
        (item.description || "").toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.tool.toLowerCase().includes(keyword) ||
        (item.level || "").toLowerCase().includes(keyword) ||
        (item.subject || "").toLowerCase().includes(keyword) ||
        item.prompt_text.toLowerCase().includes(keyword);

      return matchCategory && matchTool && matchSearch;
    });
  }, [prompts, search, activeCategory, activeTool]);

  async function copyPrompt(text: string, id: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      await supabase
        .from("prompts")
        .update({
          copy_count:
            (prompts.find((item) => item.id === id)?.copy_count || 0) + 1,
        })
        .eq("id", id);

      setPrompts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, copy_count: item.copy_count + 1 }
            : item
        )
      );

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

        {isLoading ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center backdrop-blur">
            <div className="text-5xl">⏳</div>
            <h2 className="mt-4 text-2xl font-extrabold">
              กำลังโหลด Prompt...
            </h2>
            <p className="mt-2 text-slate-300">
              กำลังดึงข้อมูลจาก Supabase
            </p>
          </div>
        ) : (
          <>
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

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-slate-400">
                พบ {filteredPrompts.length} Prompt จากทั้งหมด {prompts.length} รายการ
              </p>

              <button
                onClick={fetchPrompts}
                className="w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
              >
                รีเฟรชข้อมูล
              </button>
            </div>

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
                    item={{
                      id: item.id,
                      title: item.title,
                      category: item.category,
                      tool: item.tool,
                      description: item.description || "",
                      prompt: item.prompt_text,
                    }}
                    copiedId={copiedId}
                    onCopy={copyPrompt}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}