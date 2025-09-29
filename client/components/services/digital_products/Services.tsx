import { CheckCircle } from "lucide-react";
import StepCard from "../StepCard";

export function Services() {
  const steps = [
    {
      number: "01",
      title: "Research & Discovery",
      description: [
        "Collaborate to define your product vision, goals, and target audience",
        "Conduct comprehensive market and competitive research",
        "Identify key user needs and pain points through detailed analysis",
      ],
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: [
        "Create intuitive, user-centric designs with a focus on UX/UI excellence",
        "Develop interactive prototypes for validation and testing",
        "Ensure alignment with your brand and business objectives",
      ],
    },
    {
      number: "03",
      title: "Development & Tech Integration",
      description: [
        "Develop robust, scalable products using modern frameworks and best practices",
        "Integrate AI, IoT, and emerging technologies for maximum performance",
        "Implement agile methodologies for rapid, iterative development cycles",
      ],
    },
    {
      number: "04",
      title: "Test & Optimize",
      description: [
        "Perform rigorous testing, including functionality, performance, and security",
        "Utilize A/B testing and user feedback to refine and improve features",
        "Ensure cross-platform compatibility and optimal user experience",
      ],
    },
    {
      number: "05",
      title: "Launch & Scale",
      description: [
        "Deploy your product with a smooth, reliable rollout",
        "Monitor performance and user engagement for continuous improvements",
        "Scale and enhance features to keep your product competitive and relevant",
      ],
    },
  ];

  return (
    <section className="bg-[#1C1C1C] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Build Products That Drive Success
            <span className="block text-[#ff3131] mt-2">
              In 5 Strategic Steps
            </span>
          </h2>
          <p className="text-lg text-[#BDC3C7] w-full text-justify leading-relaxed">
            Transform to a digital-first world, exceptional products are key
            assets. Our digital product engineering services combine
            cutting-edge technology with user-centered design to create
            solutions that not only meet current market demands but also
            anticipate future trends. Each step is tailored to your vision,
            delivering measurable results.
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 gap-8">
          <StepCard steps={steps} />
        </div>
      </div>
    </section>
  );
}
