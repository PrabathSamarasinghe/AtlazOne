"use client";

import { motion } from "framer-motion";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: typeof LucideIcon;
  title: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
  index: number;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  color,
  bgColor,
  index,
}: StatsCardProps) {
  const isPositive = change.startsWith("+");
  return (
    <motion.div
      className="rounded-2xl p-6 transition-all duration-300 group"
      style={{
        backgroundColor: "#1A1B23",
        border: "1px solid #374151",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#3B82F6";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#374151";
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6" style={{ color: color }} />
        </div>
        <div
          className="text-sm font-medium"
          style={{ color: isPositive ? "#22C55E" : "#EF4444" }}
        >
          {change}
        </div>
      </div>

      <div className="space-y-1">
        <h3
          className="text-2xl font-bold transition-all duration-300 group-hover:text-blue-400"
          style={{ color: "#F8FAFC" }}
        >
          {value}
        </h3>
        <p className="text-sm" style={{ color: "#94A3B8" }}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}
