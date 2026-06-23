"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { supabase } from "@/app/lib/supabaseClient";

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

export default function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [prompt, setPrompt] = useState<PromptItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPrompt() {
      const resolvedParams = await params;
      fetchPrompt(resolvedParams.id);
    }

    loadPrompt();
  }, [params]);

  async function fetchPrompt(id: string) {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("prompts")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (error) {
      console.error(error);
      setPrompt(null);
      setIsLoading(false);
      return;
    }

    setPrompt(data);
    setIsLoading(false);
  }

  async function copyPrompt() {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt.prompt_text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

      const newCount = prompt.copy_count + 1;

      setPrompt({
        ...prompt,
        copy_count: newCount,
      });

      await supabase
        .from("prompts")
        .update({
          copy_count: newCount,
        })
        .eq("id", prompt.id);
    } catch (error) {
      console.error(error);
      alert("คัดลอก Prompt ไม่สำเร็จ");
    }
  }

  return (
    // คุมโทนสีพื้นหลังให้เหมือนหน้าหลัก
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden pb-20">
      
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] fixed"></div>
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[150px] pointer-events-none"></div>

      <Navbar />

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        {isLoading ? (
          // --- Loading State ---
          <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <div className="text-5xl animate-bounce">⏳</div>
            <h1 className="mt-6 text-2xl font-black text-white">กำลังโหลดข้อมูล Prompt</h1>
            <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่...</p>
          </div>
        ) : !prompt ? (
          // --- Empty / Not Found State ---
          <div className="relative rounded-[2rem] border border-white/5 bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 text-5xl shadow-inner">
              🔎
            </div>
            <h1 className="mt-6 text-2xl font-black text-white">ไม่พบ Prompt นี้</h1>
            <p className="mt-2 text-sm text-slate-400">
              Prompt อาจถูกลบ หรือยังไม่ได้เปิดเผยแพร่
            </p>
            <a 
              href="/prompts" 
              className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
              กลับไปคลัง Prompt
            </a>
          </div>
        ) : (
          // --- Prompt Content ---
          <div className="space-y-6">
            
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-10">
              
              {/* Back Button & Badges */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/prompts"
                  className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  <span className="transition-transform group-hover:-translate-x-1">←</span> 
                  กลับคลัง Prompt
                </a>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-sm">
                    {prompt.category}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 shadow-sm">
                    {prompt.tool}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-8">
                <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  {prompt.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                  {prompt.description || "ไม่มีคำอธิบายสำหรับ Prompt นี้"}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/50 p-4 shadow-inner">
                  <div className="text-xl">🆔</div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">รหัส Prompt</p>
                    <p className="font-black text-white">{prompt.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 shadow-inner">
                  <div className="text-xl">📋</div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/70">คัดลอกไปแล้ว</p>
                    <p className="font-black text-emerald-300">{prompt.copy_count} ครั้ง</p>
                  </div>
                </div>

                {prompt.level && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/50 p-4 shadow-inner">
                    <div className="text-xl">🎓</div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ระดับชั้น</p>
                      <p className="font-black text-white">{prompt.level}</p>
                    </div>
                  </div>
                )}

                {prompt.subject && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/50 p-4 shadow-inner">
                    <div className="text-xl">📚</div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">รายวิชา</p>
                      <p className="font-black text-white">{prompt.subject}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt Content Box (กล่องข้อความ Prompt) */}
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-slate-950/80 shadow-[0_0_40px_rgba(16,185,129,0.05)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white">เนื้อหา Prompt</h2>
                    <p className="text-xs text-slate-400">
                      คัดลอกข้อความด้านล่าง แล้วนำไปใช้กับเครื่องมือ AI
                    </p>
                  </div>
                </div>

                {/* ปุ่มคัดลอกหลัก */}
                <button 
                  onClick={copyPrompt} 
                  className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold transition-all shadow-lg ${
                    copied 
                      ? "bg-emerald-500 text-white shadow-emerald-500/40" 
                      : "bg-white/10 text-white hover:bg-emerald-500 hover:shadow-emerald-500/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {copied ? (
                      <>
                        <span>✓</span> คัดลอกแล้ว
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        คัดลอก Prompt
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* พื้นที่แสดงข้อความ (ตกแต่ง Scrollbar ด้วย Tailwind Arbitrary Variants) */}
              <div className="p-6">
                <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded-2xl bg-black/50 p-6 font-mono text-sm leading-relaxed text-emerald-50/90 shadow-inner [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50">
                  {prompt.prompt_text}
                </pre>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl md:p-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <h2 className="text-xl font-black text-white">คำแนะนำการใช้งาน</h2>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="group rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-sm font-black text-emerald-400">1</div>
                  <h3 className="mt-4 text-sm font-black text-white group-hover:text-emerald-300">คัดลอก Prompt</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    กดปุ่มคัดลอก แล้วนำข้อความไปวางใน ChatGPT หรือเครื่องมือ AI ที่ต้องการ
                  </p>
                </div>

                <div className="group rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition-all hover:-translate-y-1 hover:border-amber-500/30 hover:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-sm font-black text-amber-400">2</div>
                  <h3 className="mt-4 text-sm font-black text-white group-hover:text-amber-300">ปรับข้อมูลรายวิชา</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    เปลี่ยน [ข้อความในวงเล็บ] เช่น ระดับชั้น รายวิชา หรือหัวข้อให้ตรงกับงานของคุณ
                  </p>
                </div>

                <div className="group rounded-2xl border border-white/5 bg-slate-950/50 p-5 transition-all hover:-translate-y-1 hover:border-sky-500/30 hover:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sm font-black text-sky-400">3</div>
                  <h3 className="mt-4 text-sm font-black text-white group-hover:text-sky-300">ตรวจทานก่อนใช้จริง</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    ตรวจสอบความถูกต้องของเนื้อหา ภาษา และปรับแก้ให้เข้ากับบริบทของผู้เรียน
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}