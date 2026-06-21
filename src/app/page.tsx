import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Tools from "./components/Tools";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.35),transparent_30%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.25),transparent_25%)]" />

      <Navbar />
      <Hero />
      <Stats />
      <Tools />
      <Footer />
    </main>
  );
}