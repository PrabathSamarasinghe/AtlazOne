"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const TechBackground = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 15,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: "#F8FAFC",
            opacity: 0.3,
            boxShadow: `0 0 ${particle.size * 2}px rgba(248, 250, 252, 0.5)`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.3, 1, 0.2, 0.9, 0.1],
            scale: [0.8, 1.2, 1, 1.3, 0.9, 1.1, 0.8],
            filter: [
              "brightness(0.5)",
              "brightness(1.5)",
              "brightness(1)",
              "brightness(2)",
              "brightness(0.7)",
              "brightness(1.8)",
              "brightness(0.5)",
            ],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
            times: [0, 0.1, 0.3, 0.4, 0.6, 0.8, 1],
          }}
        />
      ))}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: `linear-gradient(to top, #0A0A0B 0%, rgba(10, 10, 11, 0.8) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
    router.push("/admin/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#0A0A0B" }}
    >
      <TechBackground />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#3B82F6" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#3B82F6" }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {" "}
        <div
          className="backdrop-blur-sm rounded-2xl p-8 border shadow-2xl"
          style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#3B82F6" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AtlazOne
            </motion.h1>
            <motion.p
              style={{ color: "#94A3B8" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Admin Dashboard Login
            </motion.p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {" "}
              <Input
                name="email"
                type="email"
                placeholder="admin@AtlazOne.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
                style={{
                  backgroundColor: "#0A0A0B",
                  borderColor: "#374151",
                  color: "#F8FAFC",
                }}
              />
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {" "}
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 pr-12"
                style={{
                  backgroundColor: "#0A0A0B",
                  borderColor: "#374151",
                  color: "#F8FAFC",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: "#94A3B8" }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {" "}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold h-12 rounded-lg transition-all duration-300 hover:shadow-lg group"
                style={{
                  backgroundColor: "#3B82F6",
                  color: "#F8FAFC",
                  border: "none",
                }}
              >
                {isLoading ? (
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
                    Sign In
                    <LogIn className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>{" "}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Demo credentials: any email and password
            </p>
          </motion.div>
        </div>
        {/* Professional accent effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-20 blur-xl -z-10"
          style={{ backgroundColor: "#3B82F6" }}
        />
      </motion.div>
    </div>
  );
}
