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

  // Mobile-specific animation variants
  const mobileTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileCTAVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
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
      {/* Logo and Company Name - Desktop: Top Left, Mobile: Hidden (moved to center) */}
      <motion.div
        className="absolute top-4 sm:top-6 md:top-9 left-4 sm:left-6 md:left-16 lg:left-20 xl:left-28 z-20 items-center gap-2 sm:gap-2 md:gap-3 hidden sm:flex"
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
            className="h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 w-auto"
          />
        </motion.div>
        <motion.h1
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white">ATLAZ</span>
          <span className="text-[#ff3131]">ONE</span>
        </motion.h1>
      </motion.div>{" "}
      {/* Main Content - Mobile: Centered, Desktop: Left aligned */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:justify-start sm:px-4 lg:px-8">
        <div className="w-full max-w-7xl text-center sm:text-left ml-0 sm:ml-4 md:ml-12 lg:ml-16 xl:ml-20">
          
          {/* Mobile Centered Layout */}
          <div className="sm:hidden flex flex-col items-center justify-center space-y-8">
            {/* Mobile Logo and Brand */}
            <motion.div
              className="flex flex-col items-center gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              >
              <Image
                src="/ATLAZONE.png"
                alt="ATLAZONE"
                width={160}
                height={53}
                className="h-20 w-auto transform transition-all duration-300 hover:brightness-110"
                priority
              />
              </motion.div>
              <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight bg-clip-text"
              >
              <span className="text-white">ATLAZ</span>
              <span className="text-[#ff3131] hover:text-[#ff4444] transition-colors duration-300">ONE</span>
              </motion.h1>
            </motion.div>

            {/* Mobile Motto */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h2 className="text-2xl leading-tight text-white tracking-wide font-bold">
                Your Digital
              </h2>
              <h2 className="text-2xl leading-tight text-white tracking-wide font-bold">
                Strategy Partner
              </h2>
            </motion.div>

            {/* Mobile Tagline
            <motion.p
              className="text-gray-300 text-base font-medium leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Transforming ideas into digital excellence
            </motion.p> */}

            {/* Mobile Tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.div 
                className="flex items-center"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-2">•</span>
                <span className="text-white">Data-Driven</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-2">•</span>
                <span className="text-white">User-Centered</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-2">•</span>
                <span className="text-white">Compliant</span>
              </motion.div>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              className="mt-6"
              variants={mobileCTAVariants}
              initial="hidden"
              animate="visible"
              whileTap="tap"
            >
              {/* <motion.button 
                className="bg-gradient-to-r from-[#ff3131] to-[#ff5555] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg border border-white/20"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(255, 49, 49, 0.3), 0 10px 10px -5px rgba(255, 49, 49, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Get Started
              </motion.button> */}
            </motion.div>
          </div>

          {/* Desktop Layout (unchanged) */}
          <motion.div
            className="hidden sm:block space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-relaxed text-white tracking-wide font-bold">
                Your Digital
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-relaxed text-white tracking-wide font-bold">
                Strategy Partner
              </h1>
            </motion.div>

            <motion.div
              className="flex items-start flex-row text-lg md:text-2xl text-white max-w-2xl leading-relaxed font-semibold space-x-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div 
                className="flex items-center pr-4"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-0 text-base">•</span>
                <span className="ml-1">Data-Driven</span>
              </motion.div>
              <motion.div 
                className="flex items-center px-4"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-0 text-base">•</span>
                <span className="ml-1">User-Centered</span>
              </motion.div>
              <motion.div 
                className="flex items-center px-4"
                variants={mobileTagVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[#ff3131] mr-0 text-base">•</span>
                <span className="ml-1">Compliant</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
