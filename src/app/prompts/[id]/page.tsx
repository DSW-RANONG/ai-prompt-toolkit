"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { prompts } from "../../data/prompts";

export default function PromptDetailPage() {
  const params = useParams();
  const [copied, setCopied] = useState(false);

  const id = Number(params.id);

  const promptItem = useMemo(() => {
    return prompts.find((item) => item.id === id);
  }, [id]);

  async function copyPrompt(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      alert("คัดลอกไม่สำเร็จ กรุณาคัดลอกด้วยตนเอง");
    }
  }

  async function sharePrompt() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      alert("คัดลอกลิงก์ Prompt แล้ว");
    } catch {
      alert("คัดลอกลิงก์ไม่สำเร็จ กรุณาคัดลอก URL ด้วยตนเอง");
    }
  }

  if (!promptItem) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

        <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
          <a
            href="/prompts"
            className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
          >
            ← กลับไปคลัง Prompt
          </a>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center backdrop-blur">
            <div className="text-5xl">❌</div>

            <h1 className="mt-4 text-3xl font-extrabold">
              ไม่พบ Prompt นี้
            </h1>

            <p className="mt-3 text-slate-300">
              อาจไม่มี Prompt หมายเลขนี้ในระบบ
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <a
          href="/prompts"
          className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
        >
          ← กลับไปคลัง Prompt
        </a>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
              {promptItem.category}
            </span>

            <span className="rounded-full bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200">
              {promptItem.tool}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            {promptItem.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            {promptItem.description}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/50 p-5">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-extrabold text-white">
                Prompt พร้อมใช้งาน
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={sharePrompt}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-extrabold text-white hover:bg-white/20"
                >
                  แชร์ลิงก์
                </button>

                <button
                  onClick={() => copyPrompt(promptItem.prompt)}
                  className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-extrabold text-white hover:bg-emerald-400"
                >
                  {copied ? "คัดลอกแล้ว ✓" : "คัดลอก"}
                </button>
              </div>
            </div>

            <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl bg-black/40 p-5 text-sm leading-relaxed text-slate-200 md:text-base">
              {promptItem.prompt}
            </pre>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-extrabold text-emerald-200">
                วิธีใช้งาน
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                กดคัดลอก Prompt แล้วนำไปวางในเครื่องมือ AI เช่น ChatGPT,
                Gemini หรือเครื่องมือที่ระบุไว้ จากนั้นเติมข้อมูลในช่อง ...
                ให้ตรงกับบทเรียนของครู
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-extrabold text-amber-200">
                เหมาะสำหรับ
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                ครูที่ต้องการสร้างสื่อการสอน เอกสาร กิจกรรม หรือเนื้อหา
                ได้รวดเร็วขึ้น และนำไปปรับใช้กับบริบทของโรงเรียนได้จริง
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}