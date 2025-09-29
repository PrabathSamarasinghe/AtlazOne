import { Users, Palette, TestTube, Rocket, CheckCircle } from "lucide-react";
import StepCard from "../StepCard";

const steps = [
  {
    number: "01",
    title: "Research & Discovery",
    icon: Users,
    description: [
      "Understand your audience through user interviews, surveys, and feedback",
      "Analyze competitor landscapes and market positioning",
      "Define clear project objectives to guide the creative process",
    ],
  },
  {
    number: "02",
    title: "Design & Prototyping",
    icon: Palette,
    description: [
      "Develop high-fidelity designs with cohesive branding, typography, and visual elements",
      "Build interactive prototypes to test usability and gather feedback",
      "Establish design systems for consistency across all touchpoints",
    ],
  },
  {
    number: "03",
    title: "Test & Iterate",
    icon: TestTube,
    description: [
      "Conduct user testing to evaluate design effectiveness and user satisfaction",
      "Identify pain points that impact user experience and conversion rates",
      "Refine designs based on feedback to optimize performance",
    ],
  },
  {
    number: "04",
    title: "Implement & Enhance",
    icon: Rocket,
    description: [
      "Collaborate with developers to ensure pixel-perfect implementation",
      "Provide detailed guidelines and assets for consistent deployment",
      "Monitor post-launch performance and iterate to enhance user experience",
    ],
  },
];

export function Services() {
  return (
    <section className="bg-[#1C1C1C] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center lg:text-left mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            Design Excellence Through
            <span className="block text-[#ff3131] mt-1 sm:mt-2">
              Strategic Process
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#BDC3C7] w-full text-center lg:text-left leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0">
            Our proven 4-step design methodology ensures every project delivers
            exceptional user experiences that drive engagement and business
            growth. From research to implementation, we craft designs that
            resonate with your users.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
          <StepCard steps={steps} />
        </div>
      </div>
    </section>
  );
}
