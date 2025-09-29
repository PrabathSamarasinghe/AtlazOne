"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Star, User, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimonial: Omit<Testimonial, "id">) => void;
  testimonial?: Testimonial | null;
}

const companyRoles = [
  "CEO",
  "CTO",
  "Founder",
  "Co-Founder",
  "Managing Director",
  "Project Manager",
  "Product Manager",
  "Marketing Director",
  "Operations Manager",
  "Business Owner",
  "Startup Founder",
  "Tech Lead",
  "VP Engineering",
  "Head of Product",
  "Creative Director",
];

export default function TestimonialsModal({
  isOpen,
  onClose,
  onSave,
  testimonial,
}: TestimonialsModalProps) {
  const [formData, setFormData] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    image: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        image: testimonial.image,
        content: testimonial.content,
        rating: testimonial.rating,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        image: "",
        content: "",
        rating: 5,
      });
    }
  }, [testimonial, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert("Client name is required");
      return;
    }
    if (!formData.role.trim()) {
      alert("Client role is required");
      return;
    }
    if (!formData.content.trim()) {
      alert("Testimonial content is required");
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      alert("Rating must be between 1 and 5 stars");
      return;
    }

    onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm" style={{ color: "#94A3B8" }}>
          Rating:
        </span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleChange("rating", star)}
              className="transition-colors duration-200"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= formData.rating ? "fill-current" : ""
                }`}
                style={{
                  color: star <= formData.rating ? "#F59E0B" : "#374151",
                }}
              />
            </button>
          ))}
        </div>
        <span className="text-sm" style={{ color: "#94A3B8" }}>
          ({formData.rating} star{formData.rating !== 1 ? "s" : ""})
        </span>
      </div>
    );
  };

  const renderPreviewStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-current" : ""}`}
        style={{ color: i < rating ? "#F59E0B" : "#374151" }}
      />
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="rounded-2xl p-6 w-full max-w-3xl border my-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#374151", color: "#94A3B8" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Tabs defaultValue="editor" className="space-y-6">
                <TabsList
                  className="grid w-full grid-cols-2"
                  style={{ backgroundColor: "#374151" }}
                >
                  <TabsTrigger
                    value="editor"
                    className="data-[state=active]:bg-gray-600"
                    style={{ color: "#F8FAFC" }}
                  >
                    Editor
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-gray-600"
                    style={{ color: "#F8FAFC" }}
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="editor">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Client Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#94A3B8" }}
                        >
                          Client Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter client full name"
                          required
                          style={{
                            backgroundColor: "#0A0A0B",
                            borderColor: "#374151",
                            color: "#F8FAFC",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#94A3B8" }}
                        >
                          Role & Company *
                        </label>
                        <div className="relative">
                          <Input
                            value={formData.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            placeholder="CEO at TechCorp"
                            required
                            list="role-options"
                            style={{
                              backgroundColor: "#0A0A0B",
                              borderColor: "#374151",
                              color: "#F8FAFC",
                            }}
                          />
                          <datalist id="role-options">
                            {companyRoles.map((role) => (
                              <option key={role} value={role} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>

                    {/* Profile Image */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Profile Image URL
                      </label>
                      <div className="flex items-center space-x-4">
                        <Input
                          value={formData.image}
                          onChange={(e) => handleChange("image", e.target.value)}
                          placeholder="https://example.com/client-photo.jpg"
                          style={{
                            backgroundColor: "#0A0A0B",
                            borderColor: "#374151",
                            color: "#F8FAFC",
                          }}
                        />
                        {formData.image && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
                            <Image
                              src={formData.image}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                        Provide a direct URL to the client's profile image (optional)
                      </p>
                    </div>

                    {/* Rating */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-3"
                        style={{ color: "#94A3B8" }}
                      >
                        Client Rating *
                      </label>
                      {renderStarRating()}
                      <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
                        Click on the stars to set the rating (1-5 stars)
                      </p>
                    </div>

                    {/* Testimonial Content */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Testimonial Content *
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                        placeholder="Write the client's testimonial here... (e.g., 'Working with AtlazOne was an amazing experience. They delivered exactly what we needed and exceeded our expectations.')"
                        rows={6}
                        required
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      />
                      <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                        Write in the client's voice - keep it authentic and specific to your services
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t" style={{ borderColor: "#374151" }}>
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="group"
                        style={{
                          backgroundColor: "#3B82F6",
                          color: "#F8FAFC",
                          border: "none",
                        }}
                      >
                        <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        {testimonial ? "Update" : "Create"} Testimonial
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <div className="rounded-2xl p-8 border text-center" style={{ backgroundColor: "#0A0A0B", borderColor: "#374151" }}>
                    <Quote
                      className="w-10 h-10 mx-auto mb-4 opacity-50"
                      style={{ color: "#3B82F6" }}
                    />
                    
                    <div className="flex justify-center mb-4">
                      {renderPreviewStars(formData.rating)}
                    </div>

                    <p
                      className="text-lg mb-6 leading-relaxed italic"
                      style={{ color: "#94A3B8" }}
                    >
                      "{formData.content || "Your testimonial content will appear here..."}"
                    </p>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        {formData.image ? (
                          <Image
                            src={formData.image}
                            alt={formData.name || "Preview"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: "#374151" }}
                          >
                            <User className="w-8 h-8" style={{ color: "#94A3B8" }} />
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <h4
                          className="text-lg font-bold"
                          style={{ color: "#F8FAFC" }}
                        >
                          {formData.name || "Client Name"}
                        </h4>
                        <p
                          className="text-base"
                          style={{ color: "#3B82F6" }}
                        >
                          {formData.role || "Role & Company"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}