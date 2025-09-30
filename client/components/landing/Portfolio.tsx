"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getDirectProjects } from "@/lib/direct-queries";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [loading, setLoading] = useState(true);

  // Determine items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // lg screens
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2); // sm screens
      } else {
        setItemsPerView(1); // mobile
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getDirectProjects();
        setProjects(data);
        console.log('Projects fetched directly from database:', data.length);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (projects.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, projects.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [projects.length, itemsPerView]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projects.length - itemsPerView);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projects.length - itemsPerView);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, projects.length - itemsPerView);
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
        {" "}
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
          </p>
        </motion.div>{" "}
        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          {projects.length > itemsPerView && (
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
          )}
          {/* Carousel Content */}
          <div className="overflow-hidden rounded-lg sm:rounded-xl mx-2 sm:mx-4 md:mx-6 lg:mx-8">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / itemsPerView
                }%)`,
                width: `${(projects.length * 100) / itemsPerView}%`,
              }}
            >
              {" "}
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 px-1 sm:px-2 md:px-3"
                  style={{ width: `${100 / projects.length}%` }}
                >
                  <motion.div
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 h-full"
                    style={{
                      backgroundColor: "#2E2E2E",
                      borderColor: "#BDC3C7",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "linear-gradient(to top, #1C1C1C, transparent, transparent)",
                        }}
                      />
                      {/* Project Links */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#ff3131] hover:bg-[#cc2626] text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200"
                          >
                            <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 md:p-6">
                      <div
                        className="text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                        style={{ color: "#ff3131" }}
                      >
                        {project.category}
                      </div>
                      <h3
                        className="text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transition-all duration-300 line-clamp-2"
                        style={{ color: "white" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3"
                        style={{ color: "#BDC3C7" }}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: "#1C1C1C",
                              color: "#BDC3C7",
                              borderColor: "#BDC3C7",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: "#1C1C1C",
                              color: "#ff3131",
                              borderColor: "#ff3131",
                            }}
                          >
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>{" "}
          {/* Dots Indicator */}
          {projects.length > itemsPerView && (
            <div className="flex justify-center mt-6 sm:mt-8 gap-1.5 sm:gap-2">
              {Array.from({
                length: Math.max(0, projects.length - itemsPerView + 1),
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
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
