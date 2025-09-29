import {
  Brain,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-12 sm:py-16 px-4 sm:px-6 border-t border-[#2e2e2e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="rounded-lg text-white">
                <Image src="/ATLAZONE.png" alt="Logo" width={30} height={30} />
              </div>
              <span className="text-lg sm:text-xl font-bold">
                Atlaz<span className="text-[#ff3131]">One</span>
              </span>
            </div>
            <p className="text-[#f5f5f5] leading-relaxed text-sm sm:text-base">
              Transforming businesses through data-driven, user centered, and
              compliant solutions.
            </p>{" "}
            <div className="flex gap-4 justify-center sm:justify-start">
              <a
                href="#"
                className="text-[#f5f5f5] hover:text-[#ff3131] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[#ff3131]">Services</h3>
            <ul className="space-y-2 text-[#f5f5f5] text-sm sm:text-base">
              <li>
                <Link
                  href="/services/ai_ml"
                  className="hover:text-[#ff3131] transition-colors duration-300"
                >
                  AI, ML & Data Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital_products"
                  className="hover:text-[#ff3131] transition-colors duration-300"
                >
                  Digital Product Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital_transformation"
                  className="hover:text-[#ff3131] transition-colors duration-300"
                >
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ui_ux_design"
                  className="hover:text-[#ff3131] transition-colors duration-300"
                >
                  UI/UX Design
                </Link>
              </li>
              <li></li>
            </ul>
          </div>{" "}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[#ff3131]">Contact</h3>
            <div className="space-y-3 text-[#f5f5f5] text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff3131]" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff3131]" />
                <span>+94 71 130 7990</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff3131] mt-1" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="border-t border-[#2e2e2e] pt-6 sm:pt-8 text-center">
          <p className="text-[#f5f5f5] text-xs sm:text-sm">
            © 2025 ATLAZONE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
