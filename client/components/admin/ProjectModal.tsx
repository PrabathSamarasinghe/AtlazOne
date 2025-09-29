"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Upload } from "lucide-react";
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

interface Project {
  id: number;
  title: string;
  category: string;
  status: "completed" | "in-progress" | "planning";
  client: string;
  description: string;
  tech: string[];
  image: string;
  start_date: string;
  end_date: string;
  link: string;
  github: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, "id">) => void;
  project?: Project | null;
}

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "IoT Solutions",
  "AI/ML",
  "Data Science",
];

const statuses = [
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    category: "",
    status: "planning",
    client: "",
    description: "",
    tech: [],
    image: "",
    start_date: "",
    end_date: "",
    link: "",
    github: "",
  });
  const [techInput, setTechInput] = useState("");

  // Helper function to format date for input[type="date"]
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error parsing date:", dateString, error);
      return "";
    }
  };

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        status: project.status,
        client: project.client,
        description: project.description,
        tech: project.tech,
        image: project.image,
        start_date: formatDateForInput(project.start_date),
        end_date: formatDateForInput(project.end_date),
        link: project.link,
        github: project.github,
      });
    } else {
      setFormData({
        title: "",
        category: "",
        status: "planning",
        client: "",
        description: "",
        tech: [],
        image: "",
        start_date: "",
        end_date: "",
        link: "",
        github: "",
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((tech) => tech !== techToRemove),
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
            onClick={onClose}
          >
            {" "}
            <div
              className="rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border my-8"
              style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  {project ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#374151", color: "#94A3B8" }}
                >
                  <X className="w-5 h-5" />
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
                      Project Title
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("title", e.target.value)
                      }
                      placeholder="Enter project title"
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
                      Client
                    </label>
                    <Input
                      value={formData.client}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("client", e.target.value)
                      }
                      placeholder="Client name"
                      required
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
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
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: string) =>
                        handleChange("category", value)
                      }
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: "#1A1B23",
                          borderColor: "#374151",
                        }}
                      >
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            style={{ color: "#F8FAFC" }}
                          >
                            {category}
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
                      Status
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={(
                        value: "completed" | "in-progress" | "planning"
                      ) => handleChange("status", value)}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: "#1A1B23",
                          borderColor: "#374151",
                        }}
                      >
                        {statuses.map((status) => (
                          <SelectItem
                            key={status.value}
                            value={status.value}
                            style={{ color: "#F8FAFC" }}
                          >
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Description */}{" "}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Project description..."
                    rows={4}
                    required
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                      color: "#F8FAFC",
                    }}
                  />
                </div>
                {/* Technologies */}{" "}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Technologies
                  </label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={techInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTechInput(e.target.value)
                      }
                      placeholder="Add technology"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        e.key === "Enter" && (e.preventDefault(), addTech())
                      }
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addTech}
                      variant="outline"
                      style={{
                        borderColor: "#374151",
                        color: "#94A3B8",
                        backgroundColor: "transparent",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 text-sm rounded-full cursor-pointer transition-colors"
                        style={{ backgroundColor: "#3B82F6", color: "#F8FAFC" }}
                        onClick={() => removeTech(tech)}
                      >
                        {tech}
                        <X className="w-3 h-3 ml-1" />
                      </span>
                    ))}
                  </div>
                </div>
                {/* Image URL */}{" "}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Image URL
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("image", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                      color: "#F8FAFC",
                    }}
                  />
                </div>
                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Live Demo URL
                    </label>
                    <Input
                      value={formData.link}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("link", e.target.value)
                      }
                      placeholder="https://example.com"
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
                      GitHub Repository
                    </label>
                    <Input
                      value={formData.github}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("github", e.target.value)
                      }
                      placeholder="https://github.com/username/repo"
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
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
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("start_date", e.target.value)
                      }
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
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("end_date", e.target.value)
                      }
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                      }}
                    />
                  </div>
                </div>
                {/* Actions */}{" "}
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
                    {project ? "Update" : "Create"} Project
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
