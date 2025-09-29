import { ArrowRight, Zap, Cloud, Cog } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-[#ff3131] font-medium tracking-wide uppercase text-xs sm:text-sm">
                DIGITAL TRANSFORMATION
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
                Transform your business with{" "}
                <span className="text-[#ff3131]">cutting-edge</span> digital
                solutions.
              </h1>
            </div>

            <p className="text-[#BDC3C7] text-center text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg  lg:text-left px-2 sm:px-0 mx-auto lg:mx-0">
              Modernize your operations, streamline processes, and unlock new
              possibilities with comprehensive digital transformation strategies
              tailored to your business needs.
            </p>
          </div>

          <div className="relative"></div>
        </div>
      </div>
    </section>
  );
}
