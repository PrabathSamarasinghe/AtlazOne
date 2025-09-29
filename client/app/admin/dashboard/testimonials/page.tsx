"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Star,
  Search,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TestimonialsModal from "@/components/admin/TestimonialsModal";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/testimonials",{
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Error deleting testimonial");
    }
  };

  const handleSaveTestimonial = async (testimonialData: Omit<Testimonial, "id">) => {
    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : "/api/admin/testimonials/create";
      const method = editingTestimonial ? "PATCH" : "POST";

      const payload = editingTestimonial
        ? { ...testimonialData, id: editingTestimonial.id }
        : testimonialData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchTestimonials();
        setIsModalOpen(false);
        setEditingTestimonial(null);
      } else {
        alert("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Error saving testimonial");
    }
  };

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`}
        style={{ color: i < rating ? "#F59E0B" : "#374151" }}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#F8FAFC" }}
          >
            Testimonials <span style={{ color: "#3B82F6" }}>Management</span>
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Manage client testimonials and reviews
          </p>
        </div>
        <Button
          onClick={handleAddTestimonial}
          className="group flex items-center space-x-2"
          style={{
            backgroundColor: "#3B82F6",
            color: "#F8FAFC",
            border: "none",
          }}
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Add Testimonial</span>
        </Button>
      </motion.div>

      {/* Search and Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "#94A3B8" }}
          />
          <Input
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-80"
            style={{
              backgroundColor: "#1A1B23",
              borderColor: "#374151",
              color: "#F8FAFC",
            }}
          />
        </div>
        <div
          className="flex items-center space-x-2 text-sm"
          style={{ color: "#94A3B8" }}
        >
          <MessageSquare className="w-4 h-4" />
          <span>
            {filteredTestimonials.length} of {testimonials.length} testimonials
          </span>
        </div>
      </motion.div>

      {/* Testimonials Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 border animate-pulse"
              style={{
                backgroundColor: "#1A1B23",
                borderColor: "#374151",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 bg-gray-600 rounded mx-auto mb-4" />
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-gray-600 rounded" />
                ))}
              </div>
              <div className="h-20 bg-gray-600 rounded mb-4" />
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-600 rounded" />
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#1A1B23",
                borderColor: "#374151",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "#3B82F6",
                    color: "#F8FAFC",
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#F8FAFC",
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <Quote
                  className="w-8 h-8 mx-auto mb-3 opacity-50"
                  style={{ color: "#3B82F6" }}
                />
                
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p
                  className="text-sm mb-4 leading-relaxed line-clamp-4 italic"
                  style={{ color: "#94A3B8" }}
                >
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3
                      className="font-bold text-sm"
                      style={{ color: "#F8FAFC" }}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "#3B82F6" }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredTestimonials.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MessageSquare
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "#374151" }}
          />
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#94A3B8" }}>
            {searchTerm ? "No testimonials found" : "No testimonials yet"}
          </h3>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start collecting client feedback by adding the first testimonial"}
          </p>
          {!searchTerm && (
            <Button
              onClick={handleAddTestimonial}
              style={{
                backgroundColor: "#3B82F6",
                color: "#F8FAFC",
                border: "none",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Testimonial
            </Button>
          )}
        </motion.div>
      )}

      {/* Testimonials Modal */}
      <TestimonialsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={handleSaveTestimonial}
        testimonial={editingTestimonial}
      />
    </div>
  );
}