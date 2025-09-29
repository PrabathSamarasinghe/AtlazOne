"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] leading-tight px-2">
            Ready to elevate{" "}
            <span className="text-[#a93226]">your design?</span>
          </h2>

          <p className="text-[#2E2E2E] text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2">
            Let's discuss how our design expertise can create stunning visuals
            that captivate your audience and strengthen your brand identity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button
            className="group bg-[#a93226] hover:bg-[#ff3131] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:gap-4 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
            onClick={() => (window.location.href = "/#contact")}
          >
            Contact Us
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-[#2E2E2E] w-full sm:w-auto">
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 hover:text-[#1C1C1C] transition-colors duration-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-[#F4F6F7] border border-transparent hover:border-[#BDC3C7] w-full sm:w-auto justify-center sm:justify-start"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base truncate">
                contact@example.com
              </span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-[#1C1C1C] transition-colors duration-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-[#F4F6F7] border border-transparent hover:border-[#BDC3C7] w-full sm:w-auto justify-center sm:justify-start"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">
                +94 71 130 7990
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
