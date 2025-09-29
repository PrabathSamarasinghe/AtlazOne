export function Expertise() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="text-center lg:text-left mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            Proven Expertise in Digital Transformation
          </h2>
          <p className="text-[#1C1C1C] text-sm sm:text-base md:text-lg leading-relaxed w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0">
            Whether it's modernizing legacy systems, implementing cloud
            solutions, or automating business processes, we lead your journey
            toward digital excellence and operational efficiency.
          </p>
        </div>

        <div className="bg-[#2E2E2E] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          <p className="text-[#BDC3C7] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 text-center lg:text-left">
            We specialize in transforming traditional business operations into
            streamlined, digital-first processes that drive real business value.
            From strategy to implementation, our team brings deep expertise
            across the full spectrum of digital transformation technologies.
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {" "}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white text-center md:text-left">
                Our Approach
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[#BDC3C7] text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Comprehensive assessment of existing systems and processes
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Strategic roadmap development for seamless transformation
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#a93226] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>
                    Continuous optimization and performance monitoring
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white text-center md:text-left">
                Business Impact
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-[#BDC3C7] text-sm sm:text-base">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>Reduced operational costs</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>Improved efficiency</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff3131] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <span>Enhanced scalability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
