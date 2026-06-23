import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Tools from "./components/Tools";

export default function Home() {
  return (
    // เปลี่ยนพื้นหลังให้เป็นสีเข้ม (slate-950) และเพิ่มสีไฮไลต์เวลาคลุมดำข้อความ
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-hidden">
      
      {/* เอฟเฟกต์ที่ 1: ตาราง Grid จางๆ เป็นพื้นหลัง */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* เอฟเฟกต์ที่ 2: แสง Glow สีม่วง/น้ำเงิน เรืองแสงจากด้านบน */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Components ต่างๆ ของคุณ */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Tools />
        <Footer />
      </div>
    </main>
  );
}