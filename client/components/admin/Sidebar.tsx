"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: FolderOpen,
    label: "Projects",
    href: "/admin/dashboard/projects",
  },
  {
    icon: Settings,
    label: "Services",
    href: "/admin/dashboard/services",
  },
  {
    icon: FileText,
    label: "Blog Posts",
    href: "/admin/dashboard/blog",
  },
  {
    icon: Users,
    label: "Team",
    href: "/admin/dashboard/team",
  },
  {
    icon: MessageSquare,
    label: "Testimonials",
    href: "/admin/dashboard/testimonials",
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout");
      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {" "}
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`${
          isMobileMenuOpen && "hidden"
        } lg:hidden fixed top-4 right-4 z-50 w-12 h-12 rounded-lg flex items-center justify-center transition-colors`}
        style={{
          backgroundColor: "#1A1B23",
          color: "#F8FAFC",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#374151";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#1A1B23";
        }}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}{" "}
      {/* Sidebar */}
      <motion.aside
        className={`hidden lg:flex fixed top-0 left-0 z-40 w-64 h-full border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0`}
        style={{
          backgroundColor: "#1A1B23",
          borderColor: "#374151",
        }}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: "#374151" }}>
            <motion.h1
              className="text-xl font-bold"
              style={{ color: "#F8FAFC" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AtlazOne <span style={{ color: "#3B82F6" }}>Admin</span>
            </motion.h1>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  style={{
                    backgroundColor: isActive ? "#3B82F6" : "transparent",
                    color: isActive ? "#F8FAFC" : "#94A3B8",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#1A1B23";
                      e.currentTarget.style.color = "#F8FAFC";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#94A3B8";
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>{" "}
          {/* Logout */}
          <div className="p-4 border-t" style={{ borderColor: "#374151" }}>
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
              style={{ color: "#94A3B8" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#EF4444";
                e.currentTarget.style.color = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#94A3B8";
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ x: 4 }}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>{" "}
      {isMobileMenuOpen && (
        <motion.aside
          className="flex lg:hidden fixed top-0 left-0 z-40 w-64 h-full border-r"
          style={{
            backgroundColor: "#1A1B23",
            borderColor: "#374151",
          }}
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          exit={{ x: -256 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: "#374151" }}
            >
              <h1 className="text-lg font-bold" style={{ color: "#F8FAFC" }}>
                AtlazOne <span style={{ color: "#3B82F6" }}>Admin</span>
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "#94A3B8" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#374151";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? "#3B82F6" : "transparent",
                      color: isActive ? "#F8FAFC" : "#94A3B8",
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            {/* Logout */}
            <div className="p-4 border-t" style={{ borderColor: "#374151" }}>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200"
                style={{ color: "#94A3B8" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EF4444";
                  e.currentTarget.style.color = "#F8FAFC";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#94A3B8";
                }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </>
  );
}
