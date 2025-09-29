"use client";
import { motion } from "framer-motion";

import Image from "next/image";

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

      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C]"
    >
      {" "}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center lg:text-left">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* ATLAZONE Logo beside the text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2 sm:order-1"
          >
            <Image
              src="/ATLAZONE.png"
              alt="ATLAZONE"
              width={120}
              height={40}
              className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto"
            />
          </motion.div>
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight order-1 sm:order-2">
            <span className="text-white">ATLAZ</span>
            <span className="text-[#ff3131]">ONE</span>
          </motion.h1>
        </motion.div>{" "}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-white px-2 sm:px-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Decide.Deliver.Dominate
        </motion.p>
      </div>

    </section>
  );
}
