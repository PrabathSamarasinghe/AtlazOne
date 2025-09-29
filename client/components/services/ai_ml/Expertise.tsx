export function Expertise() {
  return (    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="text-center lg:text-left mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            Proven Expertise in AI, ML & Data Engineering
          </h2>
          <p className="text-[#1C1C1C] text-sm sm:text-base md:text-lg leading-relaxed w-full text-center lg:text-left max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0">
            Whether it's building robust data pipelines, developing custom ML
            models, or integrating the latest AI solutions, we lead your journey
            toward intelligent, data-driven success.
          </p>
        </div>

        <div className="bg-[#2E2E2E] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          <p className="text-[#BDC3C7] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 text-center lg:text-left">
            We specialize in transforming complex data challenges into
            streamlined, intelligent solutions that drive real business value.
            From proof-of-concept to production deployment, our team brings deep
            expertise across the full spectrum of AI/ML technologies.
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white text-center md:text-left">Our Approach</h3>
              <ul className="space-y-2 sm:space-y-3 text-[#BDC3C7] text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    End-to-end project management from ideation to deployment
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Scalable architectures built for enterprise-grade
                    performance
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Continuous optimization and model performance monitoring
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white text-center md:text-left">                Industry Impact
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[#BDC3C7] text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Reduced operational costs through intelligent
                    automation
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Improved decision-making speed with real-time analytics
                    pipelines
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Enhanced customer experiences through personalized AI
                    solutions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
