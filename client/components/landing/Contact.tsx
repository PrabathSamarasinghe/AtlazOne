"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const autofillClass =
    "[&:-webkit-autofill]:!bg-[#2E2E2E] [&:-webkit-autofill]:!text-white " +
    "[&:-webkit-autofill:hover]:!bg-[#2E2E2E] [&:-webkit-autofill:hover]:!text-white " +
    "[&:-webkit-autofill:focus]:!bg-[#2E2E2E] [&:-webkit-autofill:focus]:!text-white " +
    "[&:-webkit-autofill:active]:!bg-[#2E2E2E] [&:-webkit-autofill:active]:!text-white";

  return (
    <motion.section

      className="py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "white" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}

      viewport={{ margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2

            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4"
            style={{ color: "#1C1C1C" }}
          >
            Get In <span style={{ color: "#ff3131" }}>Touch</span>
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2"
            style={{ color: "#2E2E2E" }}
          >

            Ready to transform your ideas into reality? Let's start a
            conversation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Information */}{" "}
          <motion.div

            className="space-y-4 sm:space-y-6 lg:space-y-8"

            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >

            <div style={{ color: "#1C1C1C" }}>
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6"
                style={{ color: "#ff3131" }}
              >
                Let's Discuss Your Project
              </h3>
              <p
                className="mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-sm sm:text-base"
                style={{ color: "#2E2E2E" }}
              >

                We're here to help bring your vision to life. Whether you need a
                complete digital transformation or want to enhance your existing
                solutions, our team is ready to deliver exceptional results.
              </p>

            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {" "}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#a93226" }}
                >
                  <Mail
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
                    style={{ color: "white" }}
                  />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: "#1C1C1C" }}
                  >
                    Email Us
                  </h4>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "#2E2E2E" }}
                  >
                    hello@innovatelab.com
                  </p>

                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div

                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#a93226" }}
                >
                  <Phone
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
                    style={{ color: "white" }}
                  />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: "#1C1C1C" }}
                  >
                    Call Us
                  </h4>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "#2E2E2E" }}
                  >
                    +1 (555) 123-4567
                  </p>

                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div

                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#a93226" }}
                >
                  <MapPin
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
                    style={{ color: "white" }}
                  />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: "#1C1C1C" }}
                  >
                    Visit Us
                  </h4>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "#2E2E2E" }}
                  >
                    San Francisco, CA 94105
                  </p>

                </div>
              </div>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {" "}
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border"
              style={{

                backgroundColor: "#2E2E2E",
                borderColor: "#BDC3C7",

              }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">

                    <Input
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{

                        backgroundColor: "#2E2E2E",
                        borderColor: "#BDC3C7",
                        color: "white",
                      }}
                      className={`focus:border-[#ff3131] focus:ring-[#ff3131] ${autofillClass}`}

                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{

                        backgroundColor: "#2E2E2E",
                        borderColor: "#BDC3C7",
                        color: "white",
                      }}
                      className={`focus:border-[#ff3131] focus:ring-[#ff3131] ${autofillClass}`}

                    />
                  </div>
                  <Input
                    name="company"
                    placeholder="Company Name (Optional)"
                    value={formData.company}
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#2E2E2E",
                      borderColor: "#BDC3C7",
                      color: "white",
                    }}
                    className={`focus:border-[#ff3131] focus:ring-[#ff3131] ${autofillClass}`}
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      backgroundColor: "#2E2E2E",
                      borderColor: "#BDC3C7",
                      color: "white",
                    }}
                    className={`focus:border-[#ff3131] focus:ring-[#ff3131] ${autofillClass} resize-none`}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold py-6 rounded-full transition-all duration-300 hover:shadow-lg group"
                    style={{

                      backgroundColor: "#a93226",
                      color: "white",
                      boxShadow: "0 10px 25px rgba(169, 50, 38, 0.15)",

                    }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle
                      className="w-16 h-16 mx-auto mb-4"

                      style={{ color: "#ff3131" }}

                    />
                  </motion.div>
                  <h3
                    className="text-2xl font-bold mb-2"

                    style={{ color: "white" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "#BDC3C7" }}>

                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              )}

            </div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
