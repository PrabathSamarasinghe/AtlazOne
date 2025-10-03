"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProjects } from '@/contexts/DataCacheContext';

interface Project {
  id: number;
  title: string;
  category: string;
  industry: string;
  image: string;
  tech: string[];
  link: string;
  github: string;
  challenge?: string;
  solution?: string;
  impact?: string;
}

export default function Portfolio() {
  const { projects, loading } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  // Determine items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerView(2.5); // xl screens - 2.5 cards for wider view
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(2.2); // lg screens - 2.2 cards for wider view
      } else if (window.innerWidth >= 768) {
        setItemsPerView(1.8); // md screens - 1.8 cards
      } else if (window.innerWidth >= 640) {
        setItemsPerView(1.2); // sm screens - 1.2 cards
      } else {
        setItemsPerView(1); // mobile - exactly 1 card
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);  }, []);
  
  // Auto-scroll carousel
  useEffect(() => {
    if (projects.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(
          0,
          projects.length - Math.floor(itemsPerView)
        );
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [projects.length, itemsPerView]);
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projects.length - Math.floor(itemsPerView));
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projects.length - Math.floor(itemsPerView));
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, projects.length - Math.floor(itemsPerView));
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <motion.section
      className="py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#1C1C1C" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4"
            style={{ color: "white" }}
          >
            Our <span style={{ color: "#ff3131" }}>Portfolio</span>
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-4"
            style={{ color: "#BDC3C7" }}
          >
            Showcasing innovative solutions that have transformed businesses
            worldwide
          </p>        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-lg sm:rounded-xl mx-2 sm:mx-4 lg:mx-6">
              <div className="flex gap-1 sm:gap-2 lg:gap-3">
                {Array.from({ length: Math.floor(itemsPerView) || 1 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-1 sm:px-2 lg:px-3 animate-pulse"
                    style={{ width: `${100 / (Math.floor(itemsPerView) || 1)}%` }}
                  >
                    <div className="bg-gradient-to-br from-[#2E2E2E] to-[#1E1E1E] border border-[#3E3E3E] rounded-xl sm:rounded-2xl overflow-hidden h-full">
                      {/* Image Skeleton */}
                      <div className="aspect-[4/3] bg-[#3E3E3E]"></div>
                      {/* Content Skeleton */}
                      <div className="p-4 sm:p-5 md:p-6 space-y-4">
                        {/* Challenge/Solution/Impact Skeleton */}
                        <div className="space-y-3">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-[#1C1C1C]/50 rounded-lg p-3">
                              <div className="h-3 bg-[#3E3E3E] rounded mb-2 w-1/3"></div>
                              <div className="h-2 bg-[#3E3E3E] rounded mb-1"></div>
                              <div className="h-2 bg-[#3E3E3E] rounded w-4/5"></div>
                            </div>
                          ))}
                        </div>
                        {/* Tech Stack Skeleton */}
                        <div className="pt-2 border-t border-[#3E3E3E]">
                          <div className="h-3 bg-[#3E3E3E] rounded mb-2 w-1/4"></div>
                          <div className="flex gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="h-6 bg-[#3E3E3E] rounded-full w-16"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Carousel Container */}
        {!loading && (
        <div className="relative max-w-7xl mx-auto">
          {" "}
          {/* Navigation Buttons */}
          {projects.length > Math.floor(itemsPerView) && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ color: "#ff3131" }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ color: "#ff3131" }}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}{" "}
          {/* Carousel Content */}
          <div className="overflow-hidden rounded-lg sm:rounded-xl mx-2 sm:mx-4 lg:mx-6">
            <motion.div
              className="flex will-change-transform"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / itemsPerView
                }%)`,
                transition:
                  "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              animate={{
                x: `${-(currentIndex * 100) / itemsPerView}%`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween",
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 px-1 sm:px-2 lg:px-3"
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                >
                  {" "}
                  <motion.div
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 h-full bg-gradient-to-br from-[#2E2E2E] to-[#1E1E1E] border border-[#3E3E3E] "
                    data-project-card
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    {" "}
                    {/* Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {/* Category and Industry Badge */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#ff3131]/90 text-white backdrop-blur-sm">
                          {project.category}
                        </span>
                        {project.industry && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#3B82F6]/90 text-white backdrop-blur-sm">
                            {project.industry}
                          </span>
                        )}
                      </div>{" "}
                      {/* Project Links */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out transform translate-y-2 group-hover:translate-y-0">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 hover:bg-[#ff3131] text-white p-2 rounded-full transition-all duration-300 ease-out backdrop-blur-sm hover:scale-110"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 hover:bg-[#2E2E2E] text-white p-2 rounded-full transition-all duration-300 ease-out backdrop-blur-sm hover:scale-110"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {/* Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    {/* Content Section */}
                    <div className="p-4 sm:p-5 md:p-6 space-y-4">
                      {/* Challenge, Solution, Impact Grid */}
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {/* Challenge */}
                        <div className="bg-[#1C1C1C]/50 rounded-lg p-3 border-l-2 border-[#ff3131]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff3131]"></div>
                            <h4 className="text-xs sm:text-sm font-semibold text-[#ff3131]">
                              Challenge
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#BDC3C7] line-clamp-2">
                            {project.challenge ||
                              "Complex technical requirements and user experience challenges that needed innovative solutions."}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="bg-[#1C1C1C]/50 rounded-lg p-3 border-l-2 border-[#3B82F6]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                            <h4 className="text-xs sm:text-sm font-semibold text-[#3B82F6]">
                              Solution
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#BDC3C7] line-clamp-2">
                            {project.solution ||
                              "Implemented cutting-edge technologies with agile methodology and user-centered design approach."}
                          </p>
                        </div>

                        {/* Impact */}
                        <div className="bg-[#1C1C1C]/50 rounded-lg p-3 border-l-2 border-[#10B981]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                            <h4 className="text-xs sm:text-sm font-semibold text-[#10B981]">
                              Impact
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#BDC3C7] line-clamp-2">
                            {project.impact ||
                              "Achieved significant improvements in performance, user engagement, and overall business outcomes."}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-2 border-t border-[#3E3E3E]">
                        <h5 className="text-xs font-semibold mb-2 text-[#BDC3C7]">
                          Technologies
                        </h5>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 sm:px-3 py-1 text-xs rounded-full bg-[#1C1C1C] text-[#BDC3C7] border border-[#3E3E3E] hover:border-[#ff3131]/50 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-[#ff3131]/10 text-[#ff3131] border border-[#ff3131]/30">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>{" "}
          {/* Dots Indicator */}
          {projects.length > Math.floor(itemsPerView) && (
            <div className="flex justify-center mt-6 sm:mt-8 gap-1.5 sm:gap-2">
              {Array.from({
                length: Math.ceil(
                  projects.length - Math.floor(itemsPerView) + 1
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#ff3131] scale-110"
                      : "bg-[#BDC3C7] hover:bg-[#ff3131] opacity-50"
                  }`}
                />
              ))}
            </div>          )}
        </div>
        )}
      </div>
    </motion.section>
  );
}
