import { CheckCircle } from "lucide-react";
import StepCard from "../StepCard";

export function Services() {
  const steps = [
    {
      number: "01",
      title: "Discover & Strategize",
      description: [
        "Evaluate current operations, systems, and digital readiness",
        "Identify key business objectives and competitive advantage factors",
        "Align technology and infrastructure to business goals",
      ],
    },
    {
      number: "02",
      title: "Plan & Design",
      description: [
        "Identify optimal methodologies including cloud platforms, AI, and automation tools",
        "Create detailed project roadmaps and milestone frameworks",
        "Plan integration to optimize existing systems with modern solutions",
      ],
    },
    {
      number: "03",
      title: "Optimize & Automate",
      description: [
        "Leverage workflows for efficiency using technologies like AI/DevOps tools",
        "Automate key business processes and operational workflows",
        "Build flexible systems for long-term scalability and growth",
      ],
    },
    {
      number: "04",
      title: "Test & Insights",
      description: [
        "Evaluate data infrastructure with scalable cloud solutions",
        "Implement AI and analytics for predictive business insights",
        "Create comprehensive testing frameworks for quality assurance",
      ],
    },
    {
      number: "05",
      title: "Launch & Integrate",
      description: [
        "Implement new tools, cloud systems, and digital solutions",
        "Ensure seamless integration across all business departments",
        "Conduct rigorous testing and security checks to ensure reliability",
      ],
    },
    {
      number: "06",
      title: "Empower & Evolve",
      description: [
        "Provide comprehensive training and ongoing technical support",
        "Create a culture of continuous improvement and innovation",
        "Monitor performance and scale solutions to support long-term growth",
      ],
    },
  ];

  return (
    <section className="bg-[#1C1C1C] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center lg:text-left mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            Unlock Growth Through Digital Innovation
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff3131] to-[#a93226]">
              In 6 Steps
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#BDC3C7] w-full leading-relaxed text-center lg:text-left max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0">
            Transform your operations and take ahead in a fast-evolving digital
            world with our structured, results-driven 6-step methodology. From
            initial assessment to complete transformation, our approach ensures
            maximum ROI and sustainable growth. We partner with you to reimagine
            processes, integrate cutting-edge tools, and create a future-ready
            business.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
          <StepCard steps={steps} />
        </div>
      </div>
    </section>
  );
}
