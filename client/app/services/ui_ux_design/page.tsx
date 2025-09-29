import { Hero } from "@/components/services/ui_ux_design/Hero";
import { Expertise } from "@/components/services/ui_ux_design/ValuePropositions";
import { Services } from "@/components/services/ui_ux_design/ProcessSteps";
import { CTA } from "@/components/services/ui_ux_design/CTA";

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
