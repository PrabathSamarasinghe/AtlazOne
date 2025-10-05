"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDirectTeamMembers } from "@/lib/direct-queries";
import { useTeam } from "@/contexts/DataCacheContext";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export default function Team() {
  const { team, loading } = useTeam();

  return (
    <motion.section
      className="py-24"
      style={{ backgroundColor: "white" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
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
            Meet Our <span style={{ color: "#ff3131" }}>Team</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            style={{ color: "#2E2E2E" }}
          >
            Passionate innovators dedicated to bringing your vision to life
          </p>{" "}
        </motion.div>
        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div
                  className="relative p-4 sm:p-6 rounded-2xl border text-center"
                  style={{
                    backgroundColor: "#2E2E2E",
                    borderColor: "#BDC3C7",
                  }}
                >
                  {/* Avatar Skeleton */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-[#3E3E3E] rounded-full"></div>

                  {/* Name Skeleton */}
                  <div className="h-6 bg-[#3E3E3E] rounded mb-2 w-3/4 mx-auto"></div>

                  {/* Role Skeleton */}
                  <div className="h-4 bg-[#3E3E3E] rounded mb-3 sm:mb-4 w-1/2 mx-auto"></div>

                  {/* Bio Skeleton */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    <div className="h-3 bg-[#3E3E3E] rounded"></div>
                    <div className="h-3 bg-[#3E3E3E] rounded w-5/6 mx-auto"></div>
                    <div className="h-3 bg-[#3E3E3E] rounded w-4/5 mx-auto"></div>
                  </div>

                  {/* Social Links Skeleton */}
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3E3E3E] rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Team Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative"
                data-team-member
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
                  className="relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 text-center hover:scale-[1.03]"
                  style={{
                    backgroundColor: "#2E2E2E",
                    borderColor: "#BDC3C7",
                  }}
                >
                  {" "}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>{" "}
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: "white" }}
                  >
                    {member.name}
                  </h3>
                  <div
                    className="font-medium mb-3 sm:mb-4"
                    style={{ color: "#ff3131" }}
                  >
                    {member.role}
                  </div>
                  <p
                    className="text-sm mb-4 sm:mb-6 leading-relaxed px-2 "
                    style={{ color: "#BDC3C7" }}
                  >
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    {" "}
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: "#BDC3C7" }}
                    >
                      <Linkedin
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: "#1C1C1C" }}
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
