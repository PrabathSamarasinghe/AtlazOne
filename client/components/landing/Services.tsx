"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { type LucideIcon } from "lucide-react";

import { LaptopIcon, RefreshCcw, Layout, Brain } from "lucide-react";

interface Service {
  icon: string;
  title: string;
  description: string;
  filepath: string;
  features: string[];
  price: number;
}

const getLucideIcon = (iconName: keyof typeof icons): LucideIcon | null => {
  const icons: { [key: string]: LucideIcon } = {
    LaptopIcon,
    RefreshCcw,
    Layout,
    Brain,
  };
  return icons[iconName] || null;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("/api/services",{
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServices(data);
    };

    fetchServices();

    return () => {
      setServices([]);
    };
  }, []);
  return (
    <motion.section
      className="py-24"
      style={{ backgroundColor: "white" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {" "}
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {" "}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            style={{ color: "#1C1C1C" }}
          >
            Our <span style={{ color: "#ff3131" }}>Services</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            style={{ color: "#2E2E2E" }}
          >
            Comprehensive digital solutions tailored to accelerate your business
            growth
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 sm:gap-8 w-3/4 mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              {" "}
              <div
                className="flex flex-col p-6 sm:p-8 rounded-2xl border transition-all duration-300 h-full"
                style={{
                  backgroundColor: "#2E2E2E",
                  borderColor: "#BDC3C7",
                  boxShadow: "0 4px 20px rgba(169, 50, 38, 0.1)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl p-3 mb-6 transition-transform duration-300"
                  style={{ backgroundColor: "#a93226" }}
                >
                  {(() => {
                    const Icon = service.icon
                      ? getLucideIcon(service.icon)
                      : getLucideIcon("Settings");
                    return Icon ? (
                      <Icon
                        className="w-full h-full"
                        style={{ color: "white" }}
                      />
                    ) : null;
                  })()}
                </div>

                <div className="flex-1 mb-6">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-4 transition-all duration-300"
                    style={{ color: "white" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="leading-relaxed text-sm sm:text-base"
                    style={{ color: "#BDC3C7" }}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    className="group/btn flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: "#a93226",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff3131";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#a93226";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => {
                      router.push(`/services/${service.filepath}`);
                    }}
                  >
                    <span className="text-sm">Learn More</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
