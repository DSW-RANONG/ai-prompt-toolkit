"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

type EvaluationItem = {
  id: number;
  fullname: string;
  school: string | null;
  before_score: number;
  after_score: number;
  content_score: number;
  speaker_score: number;
  apply_score: number;
  overall_score: number;
  impressive: string | null;
  suggestion: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    initDashboard();
  }, []);

  async function initDashboard() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      window.location.href = "/admin/login?next=/dashboard";
      return;
    }

    setAdminEmail(data.session.user.email || "Admin");
    setIsCheckingAuth(false);
    fetchEvaluations();
  }

  async function fetchEvaluations() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("evaluations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("โหลดข้อมูลแบบประเมินไม่สำเร็จ");
      setEvaluations([]);
      setIsLoading(false);
      return;
    }

    setEvaluations(data || []);
    setIsLoading(false);
  }

  async function handleLogout() {
    const ok = confirm("ต้องการออกจากระบบ Admin หรือไม่?");

    if (!ok) return;

    await supabase.auth.signOut();
    window.location.href = "/admin/login?next=/dashboard";
  }

  function average(key: keyof EvaluationItem) {
    if (evaluations.length === 0) return 0;

    const total = evaluations.reduce((sum, item) => {
      const value = item[key];

      if (typeof value === "number") {
        return sum + value;
      }

      return sum;
    }, 0);

    return total / evaluations.length;
  }

  function formatScore(value: number) {
    return value.toFixed(2);
  }

  function formatDate(dateText: string) {
    const date = new Date(dateText);

    return date.toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function exportCSV() {
    if (evaluations.length === 0) {
      alert("ยังไม่มีข้อมูลสำหรับ Export");
      return;
    }

    const headers = [
      "ID",
      "ชื่อ-สกุล",
      "โรงเรียน",
      "ความรู้ก่อนอบรม",
      "ความรู้หลังอบรม",
      "เนื้อหา",
      "วิทยากร",
      "การนำไปใช้",
      "ภาพรวม",
      "สิ่งที่ประทับใจ",
      "ข้อเสนอแนะ",
      "วันที่ส่ง",
    ];

    const rows = evaluations.map((item) => [
      item.id,
      item.fullname,
      item.school || "",
      item.before_score,
      item.after_score,
      item.content_score,
      item.speaker_score,
      item.apply_score,
      item.overall_score,
      item.impressive || "",
      item.suggestion || "",
      formatDate(item.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const value = String(cell).replace(/"/g, '""');
            return `"${value}"`;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `ai-prompt-toolkit-evaluations-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const summary = useMemo(() => {
    const total = evaluations.length;
    const beforeAvg = average("before_score");
    const afterAvg = average("after_score");
    const contentAvg = average("content_score");
    const speakerAvg = average("speaker_score");
    const applyAvg = average("apply_score");
    const overallAvg = average("overall_score");
    const improvement = afterAvg - beforeAvg;

    return {
      total,
      beforeAvg,
      afterAvg,
      contentAvg,
      speakerAvg,
      applyAvg,
      overallAvg,
      improvement,
    };
  }, [evaluations]);

  const latestComments = evaluations
    .filter((item) => item.impressive || item.suggestion)
    .slice(0, 6);

  if (isCheckingAuth) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] fixed"></div>
        <div className="relative overflow-hidden w-full max-w-md rounded-[2rem] border border-white/5 bg-white/5 p-10 text-center backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl shadow-inner animate-pulse">
            🔐
          </div>
          <h1 className="mt-6 text-2xl font-black text-white">
            กำลังตรวจสอบสิทธิ์ Admin
          </h1>
          <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden pb-20">
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] fixed"></div>
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none"></div>

      <Navbar />

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {/* --- Header Section --- */}
        <header className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Admin Dashboard
                </span>
                <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Evaluation Report
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-black text-white md:text-4xl">
                Dashboard แบบประเมิน
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                สรุปผลแบบประเมินการอบรม AI Prompt Toolkit สำหรับครู
                แสดงจำนวนผู้ตอบ คะแนนเฉลี่ย ความคิดเห็น และสามารถ Export
                ข้อมูลเป็นไฟล์ CSV ได้
              </p>
            </div>

            <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center lg:justify-end">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm shadow-inner">
                <span className="text-slate-400">Admin:</span>
                <span className="font-bold text-emerald-300">
                  {adminEmail}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <a 
                  href="/admin/prompts" 
                  className="rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
                >
                  จัดการ Prompt
                </a>

                <button 
                  onClick={fetchEvaluations} 
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white group"
                >
                  <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  รีเฟรช
                </button>

                <button 
                  onClick={exportCSV} 
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
                >
                  Export CSV
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-sm font-bold text-rose-300 transition-all hover:bg-rose-500 hover:text-white hover:shadow-[0_0_15px_rgba(243,64,105,0.4)]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-16 text-center backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <div className="text-5xl animate-bounce">⏳</div>
            <h2 className="mt-6 text-xl font-black text-white">กำลังโหลดข้อมูล</h2>
            <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่ ระบบกำลังประมวลผลสถิติ...</p>
          </div>
        ) : (
          <>
            {/* --- Summary Cards Section --- */}
            <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                icon="👥"
                title="ผู้ตอบแบบประเมิน"
                value={`${summary.total}`}
                subtitle="รายการทั้งหมด"
                tone="emerald"
              />
              <SummaryCard
                icon="📈"
                title="ความรู้เพิ่มขึ้น"
                value={`+${formatScore(summary.improvement)}`}
                subtitle="หลังอบรมเทียบก่อนอบรม"
                tone="sky"
              />
              <SummaryCard
                icon="⭐"
                title="คะแนนภาพรวม"
                value={formatScore(summary.overallAvg)}
                subtitle="จากคะแนนเต็ม 5"
                tone="amber"
              />
              <SummaryCard
                icon="🎯"
                title="การนำไปใช้"
                value={formatScore(summary.applyAvg)}
                subtitle="ความเป็นไปได้ในการใช้จริง"
                tone="purple"
              />
            </section>

            {/* --- Detail Charts & Comments Section --- */}
            <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
              {/* Score Bars */}
              <div className="rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-white">คะแนนเฉลี่ยรายด้าน</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      เปรียบเทียบคะแนนเฉลี่ยจากผู้ตอบทั้งหมด
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    เต็ม 5 คะแนน
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <ScoreBar label="ความรู้ก่อนอบรม" value={summary.beforeAvg} max={5} />
                  <ScoreBar label="ความรู้หลังอบรม" value={summary.afterAvg} max={5} color="from-sky-500 to-sky-300" />
                  <ScoreBar label="คุณภาพเนื้อหา" value={summary.contentAvg} max={5} />
                  <ScoreBar label="วิทยากร" value={summary.speakerAvg} max={5} color="from-amber-500 to-amber-300" />
                  <ScoreBar label="การนำไปใช้" value={summary.applyAvg} max={5} color="from-purple-500 to-purple-300" />
                  <ScoreBar label="ภาพรวม" value={summary.overallAvg} max={5} />
                </div>
              </div>

              {/* Latest Comments */}
              <div className="rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-8">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-white">ความคิดเห็นล่าสุด</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      สิ่งที่ประทับใจและข้อเสนอแนะจากผู้เข้าร่วม
                    </p>
                  </div>
                </div>

                {latestComments.length === 0 ? (
                  <div className="mt-6 rounded-3xl border border-white/5 bg-black/20 p-12 text-center shadow-inner">
                    <div className="text-4xl opacity-50">💬</div>
                    <h3 className="mt-4 text-base font-black text-white">ยังไม่มีความคิดเห็น</h3>
                    <p className="mt-1 text-sm text-slate-400">ระบบจะแสดงข้อมูลเมื่อมีผู้กรอกแบบประเมิน</p>
                  </div>
                ) : (
                  <div className="mt-6 max-h-[450px] space-y-4 overflow-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                    {latestComments.map((item) => (
                      <article
                        key={item.id}
                        className="group rounded-2xl border border-white/5 bg-black/30 p-5 shadow-inner transition-colors hover:bg-black/40 hover:border-white/10"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-black text-white">
                            {item.fullname}
                          </h3>
                          <span className="text-[10px] uppercase tracking-wider text-slate-500">
                            {formatDate(item.created_at)}
                          </span>
                        </div>

                        {item.school && (
                          <p className="mt-1 text-[11px] font-semibold text-emerald-300/80">
                            🏫 {item.school}
                          </p>
                        )}

                        <div className="mt-4 space-y-3">
                          {item.impressive && (
                            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3.5 transition-colors group-hover:bg-emerald-500/10">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                สิ่งที่ประทับใจ
                              </p>
                              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                                {item.impressive}
                              </p>
                            </div>
                          )}

                          {item.suggestion && (
                            <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3.5 transition-colors group-hover:bg-amber-500/10">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                                ข้อเสนอแนะ
                              </p>
                              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                                {item.suggestion}
                              </p>
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* --- Data Table Section --- */}
            <section className="mt-8 rounded-[2rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl shadow-2xl md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-xl font-black text-white">
                    ข้อมูลแบบประเมินทั้งหมด
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    รายการล่าสุดจะแสดงอยู่ด้านบน
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="/evaluation" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                    ดูหน้าแบบฟอร์ม
                  </a>
                  <button onClick={exportCSV} className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400">
                    ดาวน์โหลด CSV
                  </button>
                </div>
              </div>

              {evaluations.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-white/5 bg-black/20 p-12 text-center shadow-inner">
                  <div className="text-4xl opacity-50">📝</div>
                  <h3 className="mt-4 text-lg font-black text-white">
                    ยังไม่มีข้อมูลแบบประเมิน
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    เมื่อมีผู้ตอบแบบประเมิน ข้อมูลจะแสดงเป็นตารางที่หน้านี้
                  </p>
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-inner bg-black/20">
                  <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                    <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                      <thead className="bg-white/[0.04] text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-5 py-4">ชื่อ-สกุล</th>
                          <th className="px-5 py-4">โรงเรียน</th>
                          <th className="px-4 py-4 text-center">ก่อนอบรม</th>
                          <th className="px-4 py-4 text-center">หลังอบรม</th>
                          <th className="px-4 py-4 text-center">เนื้อหา</th>
                          <th className="px-4 py-4 text-center">วิทยากร</th>
                          <th className="px-4 py-4 text-center">นำไปใช้</th>
                          <th className="px-4 py-4 text-center">ภาพรวม</th>
                          <th className="px-5 py-4 text-right">วันที่ตอบ</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/5">
                        {evaluations.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`transition-colors hover:bg-white/[0.06] ${
                              index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                            }`}
                          >
                            <td className="px-5 py-4">
                              <p className="font-bold text-white">
                                {item.fullname}
                              </p>
                            </td>

                            <td className="px-5 py-4 text-xs text-slate-400">
                              {item.school || "-"}
                            </td>

                            <ScoreCell value={item.before_score} />
                            <ScoreCell value={item.after_score} />
                            <ScoreCell value={item.content_score} />
                            <ScoreCell value={item.speaker_score} />
                            <ScoreCell value={item.apply_score} />
                            <ScoreCell value={item.overall_score} highlight />

                            <td className="px-5 py-4 text-right text-[11px] text-slate-500 whitespace-nowrap">
                              {formatDate(item.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}

// --- Sub Components ---

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  tone,
}: {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  tone: "emerald" | "sky" | "amber" | "purple";
}) {
  const toneConfig = {
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", hoverBorder: "hover:border-emerald-500/40", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]" },
    sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", hoverBorder: "hover:border-sky-500/40", shadow: "shadow-[0_0_15px_rgba(14,165,233,0.1)]" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", hoverBorder: "hover:border-amber-500/40", shadow: "shadow-[0_0_15px_rgba(245,158,11,0.1)]" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", hoverBorder: "hover:border-purple-500/40", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.1)]" },
  }[tone];

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${toneConfig.hoverBorder}`}>
      <div className={`absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:opacity-70 opacity-30 ${toneConfig.bg}`}></div>
      
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${toneConfig.border} ${toneConfig.bg} text-3xl ${toneConfig.shadow} transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>

      <p className="mt-6 text-4xl font-black text-white tracking-tight">{value}</p>
      <h3 className={`mt-2 text-sm font-bold ${toneConfig.text}`}>{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{subtitle}</p>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  max,
  color = "from-emerald-500 to-teal-400"
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-300">{label}</p>
        <p className="text-sm font-black text-white">
          {value.toFixed(2)} <span className="text-[10px] text-slate-500 font-normal">/ {max}</span>
        </p>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-black/40 shadow-inner border border-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ScoreCell({
  value,
  highlight,
}: {
  value: number;
  highlight?: boolean;
}) {
  return (
    <td className="px-4 py-4 text-center">
      <span
        className={`inline-flex min-w-[2.5rem] items-center justify-center rounded-xl px-2 py-1 text-xs font-black shadow-inner border ${
          highlight
            ? "border-amber-500/30 bg-amber-500/15 text-amber-300"
            : "border-white/5 bg-black/40 text-slate-300"
        }`}
      >
        {value.toFixed(1).replace('.0', '')}
      </span>
    </td>
  );
}