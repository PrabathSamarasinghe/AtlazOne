import NavBar from "@/components/landing/NavBar";
import { Hero } from "@/components/services/digital_transformation/Hero";
import { Expertise } from "@/components/services/digital_transformation/Expertise";
import { Services } from "@/components/services/digital_transformation/Services";
import { CTA } from "@/components/services/digital_transformation/CTA";

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
