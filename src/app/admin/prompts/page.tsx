"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

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

type PromptForm = {
  title: string;
  description: string;
  prompt_text: string;
  category: string;
  tool: string;
  level: string;
  subject: string;
  tags: string;
  is_published: boolean;
};

const emptyForm: PromptForm = {
  title: "",
  description: "",
  prompt_text: "",
  category: "",
  tool: "",
  level: "",
  subject: "",
  tags: "",
  is_published: true,
};

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [form, setForm] = useState<PromptForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("prompts")
      .select("*")
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

  function updateForm(key: keyof PromptForm, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(item: PromptItem) {
    setEditingId(item.id);

    setForm({
      title: item.title,
      description: item.description || "",
      prompt_text: item.prompt_text,
      category: item.category,
      tool: item.tool,
      level: item.level || "",
      subject: item.subject || "",
      tags: item.tags ? item.tags.join(", ") : "",
      is_published: item.is_published,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function prepareTags(text: string) {
    return text
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("กรุณากรอกชื่อ Prompt");
      return;
    }

    if (!form.category.trim()) {
      alert("กรุณากรอกหมวดหมู่");
      return;
    }

    if (!form.tool.trim()) {
      alert("กรุณากรอกเครื่องมือ AI");
      return;
    }

    if (!form.prompt_text.trim()) {
      alert("กรุณากรอกเนื้อหา Prompt");
      return;
    }

    setIsSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      prompt_text: form.prompt_text.trim(),
      category: form.category.trim(),
      tool: form.tool.trim(),
      level: form.level.trim() || null,
      subject: form.subject.trim() || null,
      tags: prepareTags(form.tags),
      is_published: form.is_published,
    };

    if (editingId) {
      const { error } = await supabase
        .from("prompts")
        .update(payload)
        .eq("id", editingId);

      setIsSaving(false);

      if (error) {
        console.error(error);
        alert("แก้ไข Prompt ไม่สำเร็จ");
        return;
      }

      alert("แก้ไข Prompt สำเร็จ");
      resetForm();
      fetchPrompts();
      return;
    }

    const { error } = await supabase.from("prompts").insert(payload);

    setIsSaving(false);

    if (error) {
      console.error(error);
      alert("เพิ่ม Prompt ไม่สำเร็จ");
      return;
    }

    alert("เพิ่ม Prompt สำเร็จ");
    resetForm();
    fetchPrompts();
  }

  async function deletePrompt(id: number) {
    const ok = confirm("ต้องการลบ Prompt นี้จริงหรือไม่?");

    if (!ok) return;

    const { error } = await supabase.from("prompts").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("ลบ Prompt ไม่สำเร็จ");
      return;
    }

    alert("ลบ Prompt สำเร็จ");
    fetchPrompts();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.20),transparent_25%)]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="/dashboard"
              className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur hover:bg-white/20"
            >
              ← กลับ Dashboard
            </a>

            <div className="mt-8">
              <div className="inline-flex rounded-full border border-emerald-400/30 bg-white/10 px-5 py-2 text-sm font-semibold text-emerald-100 backdrop-blur">
                Admin Prompt Manager
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                จัดการ Prompt
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                เพิ่ม แก้ไข ลบ และกำหนดสถานะเผยแพร่ Prompt
                โดยบันทึกข้อมูลลง Supabase โดยตรง
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/prompts"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-extrabold text-white hover:bg-white/20"
            >
              ดูหน้า Prompt
            </a>

            <button
              onClick={fetchPrompts}
              className="rounded-2xl bg-emerald-500 px-5 py-3 font-extrabold text-white hover:bg-emerald-400"
            >
              รีเฟรชข้อมูล
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8"
          >
            <h2 className="text-2xl font-extrabold">
              {editingId ? "แก้ไข Prompt" : "เพิ่ม Prompt ใหม่"}
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              กรอกข้อมูล Prompt ให้ครบถ้วน แล้วกดบันทึก
            </p>

            <div className="mt-6 space-y-5">
              <InputField
                label="ชื่อ Prompt"
                value={form.title}
                onChange={(value) => updateForm("title", value)}
                placeholder="เช่น แผนการสอน Active Learning"
                required
              />

              <InputField
                label="คำอธิบายสั้น"
                value={form.description}
                onChange={(value) => updateForm("description", value)}
                placeholder="เช่น สร้างแผนการสอนแบบครบองค์ประกอบ"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="หมวดหมู่"
                  value={form.category}
                  onChange={(value) => updateForm("category", value)}
                  placeholder="เช่น แผนการสอน"
                  required
                />

                <InputField
                  label="เครื่องมือ AI"
                  value={form.tool}
                  onChange={(value) => updateForm("tool", value)}
                  placeholder="เช่น ChatGPT"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="ระดับชั้น"
                  value={form.level}
                  onChange={(value) => updateForm("level", value)}
                  placeholder="เช่น ม.1 หรือ ทุกระดับชั้น"
                />

                <InputField
                  label="รายวิชา"
                  value={form.subject}
                  onChange={(value) => updateForm("subject", value)}
                  placeholder="เช่น อัลฟิกฮ์ หรือ ทั่วไป"
                />
              </div>

              <InputField
                label="Tags"
                value={form.tags}
                onChange={(value) => updateForm("tags", value)}
                placeholder="คั่นด้วย comma เช่น แผนการสอน, Active Learning, ครู"
              />

              <div>
                <label className="text-sm font-bold text-emerald-200">
                  เนื้อหา Prompt <span className="text-red-300">*</span>
                </label>

                <textarea
                  value={form.prompt_text}
                  onChange={(e) => updateForm("prompt_text", e.target.value)}
                  placeholder="วางเนื้อหา Prompt ที่นี่"
                  rows={12}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    updateForm("is_published", e.target.checked)
                  }
                  className="h-5 w-5"
                />

                <div>
                  <p className="font-bold text-white">เผยแพร่ Prompt นี้</p>
                  <p className="text-sm text-slate-400">
                    ถ้าไม่เลือก Prompt จะไม่แสดงในหน้า /prompts
                  </p>
                </div>
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-emerald-500 px-6 py-3 font-extrabold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "กำลังบันทึก..."
                    : editingId
                      ? "บันทึกการแก้ไข"
                      : "เพิ่ม Prompt"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-extrabold text-white hover:bg-white/20"
                  >
                    ยกเลิกแก้ไข
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  รายการ Prompt ทั้งหมด
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  ทั้งหมด {prompts.length} รายการ
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                <div className="text-5xl">⏳</div>
                <h3 className="mt-4 text-xl font-extrabold">
                  กำลังโหลดข้อมูล...
                </h3>
              </div>
            ) : prompts.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                <div className="text-5xl">📝</div>
                <h3 className="mt-4 text-xl font-extrabold">
                  ยังไม่มี Prompt
                </h3>
              </div>
            ) : (
              <div className="mt-6 max-h-[820px] space-y-4 overflow-auto pr-2">
                {prompts.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/25 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                            {item.category}
                          </span>

                          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                            {item.tool}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              item.is_published
                                ? "bg-sky-400/10 text-sky-200"
                                : "bg-red-400/10 text-red-200"
                            }`}
                          >
                            {item.is_published ? "เผยแพร่" : "ซ่อน"}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-extrabold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-slate-300">
                          {item.description || "-"}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          Copy: {item.copy_count} ครั้ง • ID: {item.id}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <a
                          href={`/prompts/${item.id}`}
                          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                        >
                          ดู
                        </a>

                        <button
                          onClick={() => startEdit(item)}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-amber-400"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() => deletePrompt(item.id)}
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-400"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-bold text-emerald-200">
        {label} {required && <span className="text-red-300">*</span>}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400"
      />
    </div>
  );
}