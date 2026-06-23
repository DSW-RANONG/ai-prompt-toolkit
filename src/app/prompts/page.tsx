"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import PromptCard from "../components/PromptCard";
import PromptFilters from "../components/PromptFilters";
import PromptHeader from "../components/PromptHeader";
import { supabase } from "../lib/supabaseClient";

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

type CardPromptItem = {
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

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedTool, setSelectedTool] = useState("ทั้งหมด");

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
      setPrompts([]);
      setIsLoading(false);
      return;
    }

    setPrompts(data || []);
    setIsLoading(false);
  }

  const categories = useMemo(() => {
    return Array.from(new Set(prompts.map((item) => item.category))).filter(
      Boolean,
    );
  }, [prompts]);

  const tools = useMemo(() => {
    return Array.from(new Set(prompts.map((item) => item.tool))).filter(
      Boolean,
    );
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return prompts.filter((item) => {
      const searchText = [
        item.title,
        item.description,
        item.prompt_text,
        item.category,
        item.tool,
        item.level,
        item.subject,
        item.tags?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = keyword ? searchText.includes(keyword) : true;

      const matchesCategory =
        selectedCategory === "ทั้งหมด" || item.category === selectedCategory;

      const matchesTool =
        selectedTool === "ทั้งหมด" || item.tool === selectedTool;

      return matchesSearch && matchesCategory && matchesTool;
    });
  }, [prompts, searchTerm, selectedCategory, selectedTool]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("ทั้งหมด");
    setSelectedTool("ทั้งหมด");
  }

  async function copyPrompt(item: CardPromptItem) {
    try {
      await navigator.clipboard.writeText(item.prompt);

      setCopiedId(item.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1400);

      const newCount = (item.copy_count || 0) + 1;

      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === item.id
            ? {
                ...prompt,
                copy_count: newCount,
              }
            : prompt,
        ),
      );

      await supabase
        .from("prompts")
        .update({
          copy_count: newCount,
        })
        .eq("id", item.id);
    } catch (error) {
      console.error(error);
      alert("คัดลอก Prompt ไม่สำเร็จ");
    }
  }

  return (
    // เพิ่มพื้นหลังสไตล์ Modern Dark (ลายตาราง + Glow) ให้เหมือนหน้า Home
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden pb-20">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] fixed"></div>

      <Navbar />
      <PromptHeader />
      <PromptFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedTool={selectedTool}
        categories={categories}
        tools={tools}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onToolChange={setSelectedTool}
        onClearFilters={clearFilters}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        
        {/* --- ส่วนหัวของผลลัพธ์การค้นหา --- */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white">
                Prompt ที่พร้อมใช้งาน
              </h2>
              {/* Badge จำนวนรายการ */}
              <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                {filteredPrompts.length} รายการ
              </span>
            </div>
            
            <p className="mt-2 text-sm text-slate-400">
              แสดงผลลัพธ์ทั้งหมดจากฐานข้อมูล ({prompts.length} Prompt)
            </p>
          </div>

          {/* แจ้งเตือนเมื่อกดคัดลอก (Copied Toast) */}
          <div className="h-10">
            {copiedId && (
              <div className="inline-flex animate-[pulse_1.5s_ease-in-out_infinite] items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/20 px-4 py-2 text-sm font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                <span className="text-emerald-400">✨</span> คัดลอก Prompt แล้ว!
              </div>
            )}
          </div>
        </div>

        {/* --- สถานะการโหลด (Loading State) --- */}
        {isLoading ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl">
            {/* เอฟเฟกต์ Shimmer แสงวิ่งผ่านการ์ดตอนโหลด */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            
            <div className="text-5xl animate-bounce">⏳</div>
            <h3 className="mt-6 text-xl font-black text-white">
              กำลังโหลดข้อมูลจากฐานข้อมูล
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              กรุณารอสักครู่ ระบบกำลังจัดเตรียม Prompt ให้คุณ...
            </p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="relative rounded-[2rem] border border-white/5 bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl transition-all">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 text-5xl shadow-inner">
              🔎
            </div>
            <h3 className="mt-6 text-xl font-black text-white">
              ไม่พบ Prompt ที่ตรงกับการค้นหา
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              ลองเปลี่ยนคำค้นหา เลือกหมวดหมู่ใหม่ หรือกดล้างตัวกรองทั้งหมด
            </p>
            <button
              onClick={clearFilters}
              className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                  level: item.level,
                  subject: item.subject,
                  tags: item.tags,
                  copy_count: item.copy_count,
                }}
                onCopy={copyPrompt}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}