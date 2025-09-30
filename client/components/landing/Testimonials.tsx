"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchWithNoCache } from "@/lib/cache-utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetchWithNoCache("/api/testimonials");
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        console.log(response);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);  return (
    <motion.section
      className="py-24"
      style={{ backgroundColor: "white" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 sm:px-6">        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            style={{ color: "#FFFFFF" }}
          >
            <span className="text-white">What Clients</span> <span style={{ color: "#DC2626" }}>Say</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            style={{ color: "#FFFFFF" }}
          >
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="relative max-w-3xl lg:max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {" "}
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <motion.div
                    className="rounded-2xl p-6 sm:p-8 border text-center relative"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#DC2626",
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Quote
                      className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 opacity-50"
                      style={{ color: "#DC2626" }}
                    />
                    <div className="flex justify-center mb-4 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                          style={{ color: "#DC2626" }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed italic px-2"
                      style={{ color: "#000000" }}
                    >
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4
                          className="text-base sm:text-lg font-bold"
                          style={{ color: "#000000" }}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className="text-sm sm:text-base"
                          style={{ color: "#DC2626" }}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>{" "}
                    {/* Professional hover effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                      style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>{" "}
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    index === currentIndex ? "#DC2626" : "#FFFFFF",
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
