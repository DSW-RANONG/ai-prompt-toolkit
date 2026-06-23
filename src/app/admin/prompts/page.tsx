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

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkAdminSession();
  }, []);

  async function checkAdminSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      window.location.href = "/admin/login?next=/admin/prompts";
      return;
    }

    setAdminEmail(data.session.user.email || "Admin");
    setIsCheckingAuth(false);
    fetchPrompts();
  }

  async function handleLogout() {
    const ok = confirm("ต้องการออกจากระบบ Admin หรือไม่?");

    if (!ok) return;

    await supabase.auth.signOut();
    window.location.href = "/admin/login?next=/admin/prompts";
  }

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
      description: form.description.trim() || null,
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

  const publishedCount = prompts.filter((item) => item.is_published).length;
  const hiddenCount = prompts.filter((item) => !item.is_published).length;

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="glass-card w-full max-w-md rounded-3xl p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">
            🔐
          </div>

          <h1 className="mt-5 text-xl font-black">
            กำลังตรวจสอบสิทธิ์ Admin
          </h1>

          <p className="mt-2 text-sm text-slate-400">กรุณารอสักครู่...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-5 text-white md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl">
        <header className="glass-card rounded-3xl p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/dashboard"
                  className="badge border border-white/10 bg-white/[0.06] text-emerald-200 hover:bg-white/10"
                >
                  ← Dashboard
                </a>

                <span className="badge border border-emerald-400/20 bg-emerald-400/10 text-emerald-100">
                  Admin Prompt Manager
                </span>
              </div>

              <h1 className="page-title mt-4">จัดการ Prompt</h1>

              <p className="page-subtitle mt-2">
                เพิ่ม แก้ไข ลบ และกำหนดสถานะเผยแพร่ Prompt สำหรับคลัง AI
                ของครู
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="max-w-full truncate rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300">
                Admin:{" "}
                <span className="font-bold text-emerald-200">
                  {adminEmail}
                </span>
              </div>

              <a href="/prompts" className="btn-soft">
                ดูหน้า Prompt
              </a>

              <button onClick={fetchPrompts} className="btn-soft">
                รีเฟรช
              </button>

              <button
                onClick={handleLogout}
                className="rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="mt-5 grid gap-5 lg:grid-cols-[410px_1fr]">
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black">
                  {editingId ? "แก้ไข Prompt" : "เพิ่ม Prompt ใหม่"}
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  กรอกข้อมูลให้ครบ แล้วกดบันทึก
                </p>
              </div>

              {editingId && (
                <span className="badge bg-amber-400/10 text-amber-200">
                  ID: {editingId}
                </span>
              )}
            </div>

            <div className="mt-5 space-y-4">
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
                placeholder="อธิบายสั้น ๆ ว่า Prompt นี้ใช้ทำอะไร"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <InputField
                  label="หมวดหมู่"
                  value={form.category}
                  onChange={(value) => updateForm("category", value)}
                  placeholder="แผนการสอน"
                  required
                />

                <InputField
                  label="เครื่องมือ"
                  value={form.tool}
                  onChange={(value) => updateForm("tool", value)}
                  placeholder="ChatGPT"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <InputField
                  label="ระดับชั้น"
                  value={form.level}
                  onChange={(value) => updateForm("level", value)}
                  placeholder="ม.1"
                />

                <InputField
                  label="รายวิชา"
                  value={form.subject}
                  onChange={(value) => updateForm("subject", value)}
                  placeholder="ทั่วไป"
                />
              </div>

              <InputField
                label="Tags"
                value={form.tags}
                onChange={(value) => updateForm("tags", value)}
                placeholder="คั่นด้วย comma เช่น ครู, AI, ใบงาน"
              />

              <div>
                <label className="text-xs font-bold text-emerald-200">
                  เนื้อหา Prompt <span className="text-red-300">*</span>
                </label>

                <textarea
                  value={form.prompt_text}
                  onChange={(e) => updateForm("prompt_text", e.target.value)}
                  placeholder="วางเนื้อหา Prompt ที่นี่"
                  rows={9}
                  className="mt-1.5 w-full resize-y rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-slate-500 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:bg-black/30">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    updateForm("is_published", e.target.checked)
                  }
                  className="h-4 w-4 accent-emerald-500"
                />

                <div>
                  <p className="text-sm font-bold text-white">เผยแพร่ Prompt</p>
                  <p className="text-xs text-slate-500">
                    ถ้าปิด จะไม่แสดงในหน้า Prompt Library
                  </p>
                </div>
              </label>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "กำลังบันทึก..."
                    : editingId
                      ? "บันทึกการแก้ไข"
                      : "เพิ่ม Prompt"}
                </button>

                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-soft">
                    ยกเลิก
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="glass-card rounded-3xl p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-black">รายการ Prompt ทั้งหมด</h2>

                <p className="mt-1 text-xs text-slate-400">
                  ทั้งหมด {prompts.length} รายการ
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="badge bg-sky-400/10 text-sky-200">
                  เผยแพร่ {publishedCount}
                </span>

                <span className="badge bg-red-400/10 text-red-200">
                  ซ่อน {hiddenCount}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                <div className="text-3xl">⏳</div>

                <h3 className="mt-3 text-base font-black">กำลังโหลดข้อมูล</h3>

                <p className="mt-1 text-xs text-slate-400">
                  กรุณารอสักครู่...
                </p>
              </div>
            ) : prompts.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                <div className="text-3xl">📝</div>

                <h3 className="mt-3 text-base font-black">ยังไม่มี Prompt</h3>

                <p className="mt-1 text-xs text-slate-400">
                  เริ่มเพิ่ม Prompt ใหม่จากฟอร์มด้านซ้าย
                </p>
              </div>
            ) : (
              <div className="mt-5 max-h-[680px] space-y-3 overflow-auto pr-1">
                {prompts.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/20 hover:bg-black/30"
                  >
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="badge bg-emerald-400/10 text-emerald-200">
                            {item.category}
                          </span>

                          <span className="badge bg-amber-400/10 text-amber-200">
                            {item.tool}
                          </span>

                          <span
                            className={`badge ${
                              item.is_published
                                ? "bg-sky-400/10 text-sky-200"
                                : "bg-red-400/10 text-red-200"
                            }`}
                          >
                            {item.is_published ? "เผยแพร่" : "ซ่อน"}
                          </span>
                        </div>

                        <h3 className="mt-2 truncate text-base font-black text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                          {item.description || "-"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                          <span>ID: {item.id}</span>
                          <span>Copy: {item.copy_count}</span>
                          {item.level && <span>ระดับ: {item.level}</span>}
                          {item.subject && <span>วิชา: {item.subject}</span>}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <a
                          href={`/prompts/${item.id}`}
                          className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                        >
                          ดู
                        </a>

                        <button
                          onClick={() => startEdit(item)}
                          className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-amber-400"
                        >
                          แก้ไข
                        </button>

                        <button
                          onClick={() => deletePrompt(item.id)}
                          className="rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-400"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
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
      <label className="text-xs font-bold text-emerald-200">
        {label} {required && <span className="text-red-300">*</span>}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
      />
    </div>
  );
}