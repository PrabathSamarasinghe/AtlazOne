import { Hero } from "@/components/services/digital_products/Hero";
import { Expertise } from "@/components/services/digital_products/Expertise";
import { Services } from "@/components/services/digital_products/Services";
import { CTA } from "@/components/services/digital_products/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Expertise />
      <Services />
      <CTA />
    </main>
  );
}
