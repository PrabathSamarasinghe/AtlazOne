import { ArrowRight, Palette, Users, Eye } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-[#ff3131] font-medium tracking-wide uppercase text-xs sm:text-sm">
                UI/UX DESIGN
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
                Craft Intuitive and{" "}
                <span className="text-[#ff3131]">Engaging User</span>{" "}
                <span className="text-[#ff3131]">Experiences</span>
              </h1>
            </div>

            <p className="text-[#BDC3C7] text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center lg:text-left px-2 sm:px-0 mx-auto lg:mx-0">
              Transform your digital presence with user-centered design that
              drives engagement, conversions, and business growth through
              exceptional experiences.
            </p>
          </div>

          <div className="relative"></div>
        </div>
      </div>
    </section>
  );
}
