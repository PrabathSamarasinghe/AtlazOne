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
export default function Footer() {
  return (

    <footer className="bg-[#121212] text-white py-16 px-6 border-t border-[#2e2e2e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2  rounded-lg text-white">
                <Image
                  src="/ATLAZONE.png" // note the leading slash
                  alt="Logo"
                  width={30}
                  height={30}

                />
              </div>
              <span className="text-xl font-bold">
                Atlaz<span className="text-[#ff3131]">One</span>
              </span>
            </div>

            <p className="text-[#f5f5f5] leading-relaxed">
              Transforming businesses through intelligent AI and data
              engineering solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"

                className="text-[#f5f5f5] hover:text-[#ff3131] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#f5f5f5] hover:text-[#ff3131] transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#f5f5f5] hover:text-[#ff3131] transition-colors duration-300"
              >
                <Github className="w-5 h-5" />

              </a>
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-[#f5f5f5]">
              <li>
                <a
                  href="#"
                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  Digital Product Engineering
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  Digital Transformation
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"
                >
                  AI, ML & Data Engineering

                </a>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-[#f5f5f5]">
              <li>
                <a
                  href="#"
                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"

                  className="hover:text-[#ff3131] transition-colors duration-300"

                >
                  Blog
                </a>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-[#f5f5f5]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff3131]" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff3131]" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff3131] mt-1" />
                <span>
                  123 Innovation Drive
                  <br />
                  Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2e2e2e] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#f5f5f5] text-sm">
              © 2025 ATLAZONE. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-[#f5f5f5]">
              <a
                href="#"
                className="hover:text-[#ff3131] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-[#ff3131] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-[#ff3131] transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
