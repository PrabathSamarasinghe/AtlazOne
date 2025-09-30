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
      </div>
      {/* Logo and Company Name - Top Left */}
      <motion.div
        className="absolute top-4 sm:top-9 left-12 sm:left-16 md:left-20 lg:left-28 z-20 flex items-center gap-2 sm:gap-3"
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
            className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto"
          />
        </motion.div>
        <motion.h1
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white">ATLAZ</span>
          <span className="text-[#ff3131]">ONE</span>
        </motion.h1>{" "}
      </motion.div>{" "}
      {/* Main Content - Centered */}
      <div
        className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "8vh" }}
      >
        <div className="w-full max-w-7xl ml-8 sm:ml-12 md:ml-16 lg:ml-20">
          {/* Motto - Main Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed text-white  tracking-wide font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Your Digital <br /> Strategy Partner
            </motion.p>{" "}
            {/* Optional subtitle */}
            <motion.div
              className="flex text-base sm:text-lg md:text-2xl text-white max-w-2xl  leading-relaxed font-semibold "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="pr-4">
                <span className="text-[#ff3131]">•</span> Data-Driven{" "}
              </div>
              <div className="px-4">
                <span className="text-[#ff3131]">•</span> User-Centered{" "}
              </div>
              <div className="px-4">
                <span className="text-[#ff3131]">•</span> Compliant
              </div>
            </motion.div>
            {/* <motion.p
              className="text-base sm:text-lg md:text-2xl text-[#BDC3C7] max-w-2xl  leading-relaxed font-semibold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              we help you <br />
              <span className="text-[#ff3131]">Decide</span> better,
              <br />
              <span className="text-[#ff3131]">Deliver</span> better, and
              <br />
              <span className="text-[#ff3131]">Dominate</span> your niche.
            </motion.p> */}{" "}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
