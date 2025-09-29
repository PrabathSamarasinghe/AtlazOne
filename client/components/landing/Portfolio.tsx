"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects",{
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, []);
  return (
    <motion.section
      className="py-24"

      style={{ backgroundColor: "#1C1C1C" }}      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {" "}        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {" "}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"

            style={{ color: "white" }}
          >
            Our <span style={{ color: "#ff3131" }}>Portfolio</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            style={{ color: "#BDC3C7" }}

          >
            Showcasing innovative solutions that have transformed businesses
            worldwide
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300"
              style={{

                backgroundColor: "#2E2E2E",
                borderColor: "#BDC3C7",

              }}              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />{" "}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:

                      "linear-gradient(to top, #1C1C1C, transparent, transparent)",
                  }}
                />

              </div>{" "}
              <div className="p-4 sm:p-6">
                <div
                  className="text-sm font-medium mb-2"

                  style={{ color: "#ff3131" }}
                >
                  {project.category}
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3 transition-all duration-300"

                  style={{ color: "white" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"

                  style={{ color: "#BDC3C7" }}

                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full "
                      style={{

                        backgroundColor: "#1C1C1C",
                        color: "#BDC3C7",
                        borderColor: "#BDC3C7",

                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}{" "}
        </div>
      </div>
    </motion.section>
  );
}
