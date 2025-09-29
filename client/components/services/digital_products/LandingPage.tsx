import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const LandingPage = () => {
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
    <div className="min-h-screen bg-[#1C1C1C]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a93226]/10 to-[#ff3131]/5"></div>
        <div className="relative max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="text-center lg:text-left lg:max-w-2xl">
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#ff3131] bg-[#ff3131]/10 rounded-full border border-[#ff3131]/20">
                DIGITAL PRODUCT ENGINEERING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 px-2 sm:px-0">
              Build Innovative,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff3131] to-[#a93226]">
                Scalable, and User-
              </span>
              Centric Digital Products
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#BDC3C7] mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              Transform ideas into market-ready digital solutions that drive
              growth and deliver exceptional user experiences.
            </p>
            <button className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white bg-gradient-to-r from-[#a93226] to-[#ff3131] rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#ff3131]/25 hover:scale-105 text-sm sm:text-base">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>{" "}
      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
              Build Products That Drive Success
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#BDC3C7] max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
              Transform to a digital-first world, exceptional products are key
              assets. Our digital product engineering services combine
              cutting-edge technology with user-centered design to create
              solutions that not only meet current market demands but also
              anticipate future trends. From initial concept to market launch,
              we partner with you to build products that resonate with users,
              drive engagement, and deliver measurable business results. Each
              step is tailored to your vision, delivering measurable results.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative bg-gradient-to-br from-[#a93226] to-[#ff3131] rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-xl hover:shadow-[#ff3131]/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight text-center sm:text-left">
                    {step.title}
                  </h3>
                </div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {step.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-white/90 text-xs sm:text-sm leading-relaxed"
                    >
                      <CheckCircle className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 text-white/80" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#a93226] to-[#ff3131] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 px-2 sm:px-0">
                Ready to build what's next?
              </h2>
              <button className="group inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-[#a93226] rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-lg hover:scale-105">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Picture placeholder section */}
      <div className="absolute top-16 sm:top-20 right-4 sm:right-8 w-48 h-36 sm:w-64 sm:h-48 border-2 border-[#ff3131]/30 rounded-lg items-center justify-center lg:flex hidden">
        <span className="text-[#ff3131] font-semibold text-sm sm:text-base">
          PICTURE
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
