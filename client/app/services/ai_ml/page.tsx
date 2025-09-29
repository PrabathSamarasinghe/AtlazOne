import NavBar from "@/components/landing/NavBar";
import { Hero } from "@/components/services/ai_ml/Hero";
import { Expertise } from "@/components/services/ai_ml/Expertise";
import { Services } from "@/components/services/ai_ml/Services";
import { CTA } from "@/components/services/ai_ml/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <Hero />
      <Expertise />
      <Services />
      <CTA />
    </main>
  );
}
