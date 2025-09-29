export function Expertise() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6 text-left">
            Proven Expertise in Digital Product Engineering
          </h2>
          <p className="text-[#1C1C1C] text-lg leading-relaxed w-full ">
            Whether it's building mobile apps, web platforms, or custom digital
            solutions, we lead your journey from concept to market-ready
            products that users love.
          </p>
        </div>

        <div className="bg-[#2E2E2E] rounded-2xl p-8 lg:p-12">
          <p className="text-[#BDC3C7] text-lg leading-relaxed mb-8">
            We specialize in transforming innovative ideas into market-ready
            digital products that drive real business value. From user research
            to deployment, our team brings deep expertise across the full
            spectrum of product development technologies.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Our Methodology
              </h3>
              <ul className="space-y-3 text-[#BDC3C7]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a93226] rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    User-centered design approach for optimal experiences
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a93226] rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Agile development with rapid prototyping and iteration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a93226] rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Continuous testing and optimization for market success
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Product Impact
              </h3>
              <ul className="space-y-3 text-[#BDC3C7]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff3131] rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Faster time-to-market with streamlined development processes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff3131] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Higher user engagement through intuitive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#ff3131] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Scalable architecture supporting business growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
