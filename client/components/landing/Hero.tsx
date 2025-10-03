"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ParticleContainer from "./ParticleContainer";

export default function Hero() {
  // Elegant container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C]"
      style={{ maxWidth: "100vw" }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <ParticleContainer />
      </div>{" "}
      {/* Logo and Company Name - Top Left */}
      <motion.div
        className="absolute top-3 sm:top-6 md:top-9 left-3 sm:left-6 md:left-16 lg:left-20 xl:left-28 z-20 flex items-center gap-1.5 sm:gap-2 md:gap-3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/ATLAZONE.png"
            alt="ATLAZONE"
            width={120}
            height={40}
            className="h-4 sm:h-6 md:h-7 lg:h-8 xl:h-9 w-auto"
          />
        </motion.div>
        <motion.h1
          className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white">ATLAZ</span>
          <span className="text-[#ff3131]">ONE</span>
        </motion.h1>
      </motion.div>{" "}
      {/* Main Content - Centered */}
      <div
        className="relative z-10 min-h-screen flex items-center justify-center sm:justify-start px-3 sm:px-4 lg:px-8"
        style={{ paddingTop: "10vh" }}
      >
        <div className="w-full max-w-7xl text-center sm:text-left ml-0 sm:ml-4 md:ml-12 lg:ml-16 xl:ml-20">
          {/* Motto - Main Content */}
          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-relaxed text-white tracking-wide font-bold px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Your Digital <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Strategy Partner
            </motion.p>

            {/* Mobile-optimized subtitle */}
            <motion.div
              className="flex flex-col items-center sm:items-start sm:flex-row text-sm sm:text-lg md:text-2xl text-white max-w-full sm:max-w-2xl leading-relaxed font-semibold space-y-2 sm:space-y-0 px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="sm:pr-4 flex items-center">
                <span className="text-[#ff3131] mr-2 sm:mr-0">•</span>
                <span className="sm:ml-1">Data-Driven</span>
              </div>
              <div className="sm:px-4 flex items-center">
                <span className="text-[#ff3131] mr-2 sm:mr-0">•</span>
                <span className="sm:ml-1">User-Centered</span>
              </div>
              <div className="sm:px-4 flex items-center">
                <span className="text-[#ff3131] mr-2 sm:mr-0">•</span>
                <span className="sm:ml-1">Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
