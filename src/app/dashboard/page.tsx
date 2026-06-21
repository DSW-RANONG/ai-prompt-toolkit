"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Evaluation = {
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
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  async function fetchEvaluations() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("evaluations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("โหลดข้อมูลไม่สำเร็จ");
      setIsLoading(false);
      return;
    }

    setEvaluations(data || []);
    setIsLoading(false);
  }

  function average(values: number[]) {
    if (values.length === 0) return 0;
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  }

  function escapeCsv(value: string | number | null) {
    if (value === null || value === undefined) return "";
    const text = String(value).replace(/"/g, '""');
    return `"${text}"`;
  }

  function exportCsv() {
    if (evaluations.length === 0) {
      alert("ยังไม่มีข้อมูลสำหรับ Export");
      return;
    }

    const headers = [
      "วันที่ส่ง",
      "ชื่อ-สกุล",
      "โรงเรียน/หน่วยงาน",
      "ความเข้าใจก่อนอบรม",
      "ความเข้าใจหลังอบรม",
      "เนื้อหาการอบรม",
      "วิทยากร",
      "การนำไปใช้จริง",
      "ความพึงพอใจรวม",
      "สิ่งที่ประทับใจ",
      "ข้อเสนอแนะ",
    ];

    const rows = evaluations.map((item) => [
      formatDate(item.created_at),
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
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) => row.map(escapeCsv).join(",")),
    ].join("\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const today = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `evaluation-results-${today}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  const summary = useMemo(() => {
    return {
      total: evaluations.length,
      beforeAvg: average(evaluations.map((item) => item.before_score)),
      afterAvg: average(evaluations.map((item) => item.after_score)),
      contentAvg: average(evaluations.map((item) => item.content_score)),
      speakerAvg: average(evaluations.map((item) => item.speaker_score)),
      applyAvg: average(evaluations.map((item) => item.apply_score)),
      overallAvg: average(evaluations.map((item) => item.overall_score)),
    };
  }, [evaluations]);

  const latestEvaluations = evaluations.slice(0, 10);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/"
              className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
            >
              ← กลับหน้าแรก
            </a>

            <div className="mt-8">
              <div className="inline-flex rounded-full border border-emerald-400/30 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
                Evaluation Dashboard
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                Dashboard ผลประเมิน
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                สรุปผลแบบประเมินการอบรม AI เพื่อครูยุคใหม่
                ดึงข้อมูลจริงจาก Supabase
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchEvaluations}
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-extrabold text-white hover:bg-white/20"
            >
              รีเฟรชข้อมูล
            </button>

            <button
              onClick={exportCsv}
              className="rounded-2xl bg-emerald-500 px-6 py-3 font-extrabold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            >
              Export CSV
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-10 text-center backdrop-blur">
            <div className="text-5xl">⏳</div>
            <h2 className="mt-4 text-2xl font-extrabold">
              กำลังโหลดข้อมูล...
            </h2>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                title="ผู้ประเมินทั้งหมด"
                value={`${summary.total}`}
                subtitle="รายการ"
                color="emerald"
              />

              <SummaryCard
                title="ก่อนอบรม"
                value={summary.beforeAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="amber"
              />

              <SummaryCard
                title="หลังอบรม"
                value={summary.afterAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="emerald"
              />

              <SummaryCard
                title="พึงพอใจรวม"
                value={summary.overallAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="sky"
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <SummaryCard
                title="เนื้อหาการอบรม"
                value={summary.contentAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="emerald"
              />

              <SummaryCard
                title="วิทยากร"
                value={summary.speakerAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="amber"
              />

              <SummaryCard
                title="การนำไปใช้จริง"
                value={summary.applyAvg.toFixed(2)}
                subtitle="คะแนนเฉลี่ย"
                color="sky"
              />
            </div>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    รายการประเมินล่าสุด
                  </h2>
                  <p className="mt-2 text-slate-300">
                    แสดงข้อมูลล่าสุด 10 รายการจาก Supabase
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/evaluation"
                    className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-center font-extrabold text-white hover:bg-white/20"
                  >
                    เปิดแบบประเมิน
                  </a>

                  <button
                    onClick={exportCsv}
                    className="rounded-2xl bg-emerald-500 px-5 py-3 font-extrabold text-white hover:bg-emerald-400"
                  >
                    ดาวน์โหลด CSV
                  </button>
                </div>
              </div>

              {latestEvaluations.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                  <div className="text-5xl">📝</div>
                  <h3 className="mt-4 text-xl font-extrabold">
                    ยังไม่มีข้อมูลประเมิน
                  </h3>
                  <p className="mt-2 text-slate-300">
                    เมื่อมีผู้กรอกแบบประเมิน ข้อมูลจะแสดงที่นี่
                  </p>
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-left text-sm text-slate-400">
                        <th className="px-4 py-2">วันที่</th>
                        <th className="px-4 py-2">ชื่อ-สกุล</th>
                        <th className="px-4 py-2">โรงเรียน</th>
                        <th className="px-4 py-2 text-center">ก่อน</th>
                        <th className="px-4 py-2 text-center">หลัง</th>
                        <th className="px-4 py-2 text-center">รวม</th>
                        <th className="px-4 py-2">ประทับใจ</th>
                      </tr>
                    </thead>

                    <tbody>
                      {latestEvaluations.map((item) => (
                        <tr
                          key={item.id}
                          className="rounded-2xl bg-black/30 text-sm text-slate-200"
                        >
                          <td className="rounded-l-2xl px-4 py-4">
                            {formatDate(item.created_at)}
                          </td>

                          <td className="px-4 py-4 font-bold text-white">
                            {item.fullname}
                          </td>

                          <td className="px-4 py-4">
                            {item.school || "-"}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {item.before_score}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {item.after_score}
                          </td>

                          <td className="px-4 py-4 text-center font-extrabold text-emerald-300">
                            {item.overall_score}
                          </td>

                          <td className="rounded-r-2xl px-4 py-4">
                            {item.impressive || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <CommentBox
                title="สิ่งที่ประทับใจล่าสุด"
                items={evaluations
                  .filter((item) => item.impressive)
                  .slice(0, 5)
                  .map((item) => ({
                    name: item.fullname,
                    text: item.impressive || "",
                  }))}
              />

              <CommentBox
                title="ข้อเสนอแนะล่าสุด"
                items={evaluations
                  .filter((item) => item.suggestion)
                  .slice(0, 5)
                  .map((item) => ({
                    name: item.fullname,
                    text: item.suggestion || "",
                  }))}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  color: "emerald" | "amber" | "sky";
}) {
  const colorClass = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    sky: "text-sky-300",
  }[color];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
      <p className="text-sm font-bold text-slate-300">{title}</p>
      <div className={`mt-3 text-4xl font-extrabold ${colorClass}`}>
        {value}
      </div>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function CommentBox({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    text: string;
  }[];
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8">
      <h2 className="text-2xl font-extrabold">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-slate-400">ยังไม่มีข้อมูล</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <p className="text-sm leading-relaxed text-slate-300">
                “{item.text}”
              </p>
              <p className="mt-3 text-sm font-bold text-emerald-200">
                — {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateText: string) {
  return new Date(dateText).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}