"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ratingItems = [
  {
    key: "before",
    label: "ความเข้าใจก่อนอบรม",
  },
  {
    key: "after",
    label: "ความเข้าใจหลังอบรม",
  },
  {
    key: "content",
    label: "เนื้อหาการอบรม",
  },
  {
    key: "speaker",
    label: "วิทยากร",
  },
  {
    key: "apply",
    label: "การนำไปใช้จริง",
  },
  {
    key: "overall",
    label: "ความพึงพอใจโดยรวม",
  },
];

type Ratings = {
  before: number;
  after: number;
  content: number;
  speaker: number;
  apply: number;
  overall: number;
};

export default function EvaluationPage() {
  const [fullname, setFullname] = useState("");
  const [school, setSchool] = useState("");
  const [impressive, setImpressive] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const [ratings, setRatings] = useState<Ratings>({
    before: 0,
    after: 0,
    content: 0,
    speaker: 0,
    apply: 0,
    overall: 0,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function setRating(key: keyof Ratings, value: number) {
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetForm() {
    setFullname("");
    setSchool("");
    setImpressive("");
    setSuggestion("");
    setRatings({
      before: 0,
      after: 0,
      content: 0,
      speaker: 0,
      apply: 0,
      overall: 0,
    });
    setSubmitted(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasEmptyRating = Object.values(ratings).some((value) => value === 0);

    if (!fullname.trim()) {
      alert("กรุณากรอกชื่อ-สกุล");
      return;
    }

    if (hasEmptyRating) {
      alert("กรุณาให้คะแนนทุกหัวข้อ");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.from("evaluations").insert({
      fullname: fullname.trim(),
      school: school.trim(),
      before_score: ratings.before,
      after_score: ratings.after,
      content_score: ratings.content,
      speaker_score: ratings.speaker,
      apply_score: ratings.apply,
      overall_score: ratings.overall,
      impressive: impressive.trim(),
      suggestion: suggestion.trim(),
    });

    setIsSaving(false);

    if (error) {
      console.error(error);
      alert("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-12">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur md:p-10">
            <div className="text-6xl">✅</div>

            <div className="mt-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm font-bold text-emerald-200">
              ส่งแบบประเมินเรียบร้อยแล้ว
            </div>

            <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">
              ขอบคุณสำหรับการประเมิน
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              ความคิดเห็นของท่านมีคุณค่าอย่างยิ่ง
              เพื่อนำไปพัฒนาการอบรม AI สำหรับครูให้ดียิ่งขึ้น
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-left">
              <h2 className="font-extrabold text-emerald-200">
                สรุปข้อมูลที่ส่ง
              </h2>

              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-bold text-white">ชื่อ-สกุล:</span>{" "}
                  {fullname}
                </p>

                {school && (
                  <p>
                    <span className="font-bold text-white">
                      โรงเรียน / หน่วยงาน:
                    </span>{" "}
                    {school}
                  </p>
                )}

                <p>
                  <span className="font-bold text-white">
                    ความพึงพอใจโดยรวม:
                  </span>{" "}
                  {ratings.overall} / 5
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl bg-emerald-500 px-6 py-3 font-extrabold text-white hover:bg-emerald-400"
              >
                ส่งแบบประเมินใหม่
              </button>

              <a
                href="/prompts"
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-extrabold text-white hover:bg-white/20"
              >
                ไปคลัง Prompt
              </a>

              <a
                href="/"
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-extrabold text-white hover:bg-white/20"
              >
                กลับหน้าแรก
              </a>
            </div>
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
          href="/"
          className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
        >
          ← กลับหน้าแรก
        </a>

        <div className="mt-8">
          <div className="inline-flex rounded-full border border-emerald-400/30 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
            Evaluation Form
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            แบบประเมินการอบรม AI
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            โครงการอบรม AI เพื่อครูยุคใหม่ ประจำปีการศึกษา 2569
            กรุณาให้คะแนนและข้อเสนอแนะเพื่อนำไปพัฒนาการอบรมครั้งต่อไป
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-emerald-200">
                ชื่อ-สกุล <span className="text-red-300">*</span>
              </label>

              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="กรอกชื่อ-สกุล"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-emerald-200">
                โรงเรียน / หน่วยงาน
              </label>

              <input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="กรอกชื่อโรงเรียนหรือหน่วยงาน"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {ratingItems.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="font-bold text-white">
                    {item.label} <span className="text-red-300">*</span>
                  </p>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => {
                      const key = item.key as keyof Ratings;
                      const active = ratings[key] === score;

                      return (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setRating(key, score)}
                          className={`h-10 w-10 rounded-full text-sm font-extrabold transition ${
                            active
                              ? "bg-emerald-500 text-white"
                              : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                        >
                          {score}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  1 = น้อยที่สุด / 5 = มากที่สุด
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-amber-200">
                สิ่งที่ประทับใจ
              </label>

              <textarea
                value={impressive}
                onChange={(e) => setImpressive(e.target.value)}
                placeholder="สิ่งที่ประทับใจจากการอบรมครั้งนี้"
                rows={5}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-amber-200">
                ข้อเสนอแนะเพิ่มเติม
              </label>

              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="ข้อเสนอแนะเพื่อปรับปรุงการอบรม"
                rows={5}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-8 w-full rounded-2xl bg-emerald-500 px-7 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "กำลังบันทึกข้อมูล..." : "ส่งแบบประเมิน"}
          </button>
        </form>
      </section>
    </main>
  );
}