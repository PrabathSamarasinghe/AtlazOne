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
    <footer className="bg-[#121212] text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-[#2e2e2e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {" "}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="rounded-lg text-white">
                <Image src="/ATLAZONE.png" alt="Logo" width={30} height={30} />
              </div>
              <span className="text-lg sm:text-xl font-bold flex items-baseline">
                ATLAZ<span className="text-[#ff3131]">ONE</span>
              </span>
            </div>
            <p className="text-[#f5f5f5] leading-relaxed text-sm sm:text-base max-w-xs mx-auto sm:mx-0 sm:max-w-none">
              Transforming businesses through data-driven, user centered, and
              compliant solutions.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start pt-2">
              <a
                href="https://www.linkedin.com/company/atlaz-one/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BHBBC5gqNTby2GRDW5PkMqg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f5f5] hover:text-[#ff3131] transition-colors duration-300 p-2 hover:bg-[#1a1a1a] rounded-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>{" "}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[#ff3131]">Services</h3>
            <ul className="space-y-3 text-[#f5f5f5] text-sm sm:text-base">
              <li>
                <Link
                  href="/services/ai_ml"
                  className="hover:text-[#ff3131] transition-colors duration-300 block py-1"
                >
                  AI, ML & Data Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital_products"
                  className="hover:text-[#ff3131] transition-colors duration-300 block py-1"
                >
                  Digital Product Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital_transformation"
                  className="hover:text-[#ff3131] transition-colors duration-300 block py-1"
                >
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ui_ux_design"
                  className="hover:text-[#ff3131] transition-colors duration-300 block py-1"
                >
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>{" "}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[#ff3131]">Contact</h3>
            <div className="space-y-3 text-[#f5f5f5] text-sm sm:text-base">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail className="w-4 h-4 text-[#ff3131] flex-shrink-0" />
                <span className="break-all sm:break-normal">
                  atlazone4@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone className="w-4 h-4 text-[#ff3131] flex-shrink-0" />
                <span>+94 77 130 7990</span>
              </div>
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="w-4 h-4 text-[#ff3131] mt-1 flex-shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="border-t border-[#2e2e2e] pt-6 sm:pt-8 text-center">
          <p className="text-[#f5f5f5] text-xs sm:text-sm leading-relaxed">
            © 2025 ATLAZONE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
