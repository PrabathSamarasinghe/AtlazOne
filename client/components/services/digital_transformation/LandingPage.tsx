import React from "react";
import { CheckCircle, ArrowRight, Zap, Cloud, Cog, Phone, Mail } from "lucide-react";

const LandingPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#2e2e2e]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#121212] via-[#2e2e2e] to-[#121212] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[#ff3131] font-medium tracking-wide uppercase text-sm">
                  DIGITAL TRANSFORMATION
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transform your business with{" "}
                  <span className="text-[#ff3131]">cutting-edge</span>{" "}
                  <span className="text-[#a93226]">digital solutions</span>.
                </h1>
              </div>

              <p className="text-[#f5f5f5] text-lg leading-relaxed max-w-lg">
                Modernize your operations, streamline processes, and unlock new
                possibilities with comprehensive digital transformation
                strategies tailored to your business needs.
              </p>

              <button className="group bg-[#a93226] hover:bg-[#ff3131] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:gap-4 shadow-lg hover:shadow-xl">
                Start Your Transformation
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-[#2e2e2e] rounded-2xl p-8 border border-[#2e2e2e] shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#121212] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#a93226] transition-colors duration-300">
                    <Cloud className="w-8 h-8 text-[#ff3131] mb-3" />
                    <h3 className="text-white font-semibold mb-2">
                      Cloud Migration
                    </h3>
                    <p className="text-[#f5f5f5] text-sm">
                      Seamless transition to scalable cloud infrastructure
                    </p>
                  </div>
                  <div className="bg-[#121212] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#a93226] transition-colors duration-300">
                    <Cog className="w-8 h-8 text-[#ff3131] mb-3" />
                    <h3 className="text-white font-semibold mb-2">
                      Process Automation
                    </h3>
                    <p className="text-[#f5f5f5] text-sm">
                      Streamlined workflows and intelligent automation
                    </p>
                  </div>
                  <div className="bg-[#121212] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#a93226] transition-colors duration-300 col-span-2">
                    <Zap className="w-8 h-8 text-[#ff3131] mb-3" />
                    <h3 className="text-white font-semibold mb-2">
                      Digital Innovation
                    </h3>
                    <p className="text-[#f5f5f5] text-sm">
                      Modern solutions that drive competitive advantage and
                      growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Unlock Growth Through Digital Innovation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff3131] to-[#a93226]">
                In 6 Steps
              </span>
            </h2>
            <p className="text-lg text-[#f5f5f5]/80 max-w-4xl mx-auto leading-relaxed">
              Transform your operations and take ahead in a fast-evolving
              digital world with our structured, results-driven 6-step
              methodology. From initial assessment to complete transformation,
              our approach ensures maximum ROI and sustainable growth. We
              partner with you to reimagine processes, integrate cutting-edge
              tools, and create a future-ready business.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative bg-gradient-to-br from-[#a93226] to-[#ff3131] rounded-xl p-6 hover:shadow-xl hover:shadow-[#ff3131]/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {step.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-white/90 text-sm leading-relaxed"
                    >
                      <CheckCircle className="flex-shrink-0 w-4 h-4 mr-2 mt-0.5 text-white/80" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#a93226] to-[#ff3131] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-12">
            <p className="text-white/90 font-medium tracking-wide uppercase text-sm">
              Turn challenges into digital opportunities.
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to build what's next?
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
              Let's discuss how our AI and data engineering expertise can
              transform your business challenges into competitive advantages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white text-[#a93226] px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:gap-4 shadow-lg hover:shadow-xl hover:bg-[#f5f5f5]">
              Contact Us
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-6 text-white/90">
              <a
                href="mailto:hello@atlaz-one.com"
                className="flex items-center gap-2 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>hello@atlaz-one.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
