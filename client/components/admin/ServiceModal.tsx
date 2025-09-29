"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  price: string;
  features: string[];
  isactive: boolean;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, "id">) => void;
  service?: Service | null | undefined;
}

const icons = [
  { value: "Code", label: "Code (Development)" },
  { value: "Smartphone", label: "Smartphone (Mobile)" },
  { value: "Globe", label: "Globe (Web/Cloud)" },
  { value: "Zap", label: "Zap (AI/Performance)" },
  { value: "Shield", label: "Shield (Security)" },
  { value: "Headphones", label: "Headphones (Support)" },
];

const colors = [
  { value: "#3B82F6", label: "Primary Blue" },
  { value: "#22C55E", label: "Success Green" },
  { value: "#8B5CF6", label: "Purple" },
  { value: "#F59E0B", label: "Warning Orange" },
  { value: "#EF4444", label: "Error Red" },
  { value: "#06B6D4", label: "Cyan" },
];

export default function ServiceModal({
  isOpen,
  onClose,
  onSave,
  service,
}: ServiceModalProps) {
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    icon: "Code",
    color: "#3B82F6",
    price: "",
    features: [],
    isactive: true,
  });
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        color: service.color,
        price: service.price,
        features: service.features,
        isactive: service.isactive,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        icon: "Code",
        color: "#3B82F6",
        price: "",
        features: [],
        isactive: true,
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (
      featureInput.trim() &&
      !formData.features.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
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
              className="rounded-2xl p-6 w-full max-w-2xl border my-8"
              style={{
                backgroundColor: "#1A1B23",
                borderColor: "#374151",
              }}
            >
              {" "}
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  {service ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#374151" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#4B5563";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#374151";
                  }}
                >
                  <X className="w-5 h-5" style={{ color: "#F8FAFC" }} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {" "}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Service Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter service title"
                      required
                      style={{
                        backgroundColor: "#0A0A0B",
                        border: "1px solid #374151",
                        color: "#F8FAFC",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#374151";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Price Range
                    </label>
                    <Input
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      placeholder="e.g., $5,000 - $50,000"
                      required
                      style={{
                        backgroundColor: "#0A0A0B",
                        border: "1px solid #374151",
                        color: "#F8FAFC",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#374151";
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {" "}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Icon
                    </label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => handleChange("icon", value)}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#0A0A0B",
                          border: "1px solid #374151",
                          color: "#F8FAFC",
                        }}
                      >
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: "#1A1B23",
                          border: "1px solid #374151",
                        }}
                      >
                        {icons.map((icon) => (
                          <SelectItem
                            key={icon.value}
                            value={icon.value}
                            style={{ color: "#F8FAFC" }}
                          >
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Color
                    </label>
                    <Select
                      value={formData.color}
                      onValueChange={(value) => handleChange("color", value)}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#0A0A0B",
                          border: "1px solid #374151",
                          color: "#F8FAFC",
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: "#1A1B23",
                          border: "1px solid #374151",
                        }}
                      >
                        {colors.map((color) => (
                          <SelectItem
                            key={color.value}
                            value={color.value}
                            style={{ color: "#F8FAFC" }}
                          >
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>{" "}
                {/* Description */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Service description..."
                    rows={4}
                    required
                    style={{
                      backgroundColor: "#0A0A0B",
                      border: "1px solid #374151",
                      color: "#F8FAFC",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3B82F6";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#374151";
                    }}
                  />
                </div>{" "}
                {/* Features */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Key Features
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addFeature())
                      }
                      style={{
                        backgroundColor: "#0A0A0B",
                        border: "1px solid #374151",
                        color: "#F8FAFC",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#374151";
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addFeature}
                      variant="outline"
                      style={{
                        borderColor: "#374151",
                        color: "#94A3B8",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1A1B23";
                        e.currentTarget.style.borderColor = "#3B82F6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "#374151";
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.features.map((feature) => (
                      <div
                        key={feature}
                        className="inline-flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer border transition-colors"
                        style={{
                          backgroundColor: "#0A0A0B",
                          color: "#3B82F6",
                          borderColor: "#3B82F6",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#1A1B23";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#0A0A0B";
                        }}
                        onClick={() => removeFeature(feature)}
                      >
                        {feature}
                        <X className="w-3 h-3 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>{" "}
                {/* Status */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isactive"
                    checked={formData.isactive}
                    onChange={(e) => handleChange("isactive", e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{
                      accentColor: "#3B82F6",
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                    }}
                  />
                  <label
                    htmlFor="isactive"
                    className="text-sm font-medium"
                    style={{ color: "#94A3B8" }}
                  >
                    Service is active and visible to clients
                  </label>
                </div>{" "}
                {/* Actions */}
                <div
                  className="flex justify-end space-x-3 pt-6 border-t"
                  style={{ borderColor: "#374151" }}
                >
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    style={{
                      borderColor: "#374151",
                      color: "#94A3B8",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1A1B23";
                      e.currentTarget.style.borderColor = "#3B82F6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#374151";
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="group"
                    style={{
                      backgroundColor: "#3B82F6",
                      color: "#F8FAFC",
                      border: "1px solid #3B82F6",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563EB";
                      e.currentTarget.style.borderColor = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#3B82F6";
                      e.currentTarget.style.borderColor = "#3B82F6";
                    }}
                  >
                    <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    {service ? "Update" : "Create"} Service
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
