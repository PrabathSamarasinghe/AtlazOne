"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload } from "@/lib/coludinary";
import Image from "next/image";
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
  image: string;
  tech: string[];
  link: string;
  github: string;
  start_date: string;
  end_date: string;
  challenge: string;
  solution: string;
  impact: string;
  industry: string;
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

const industries = [
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Real Estate",
  "Manufacturing",
  "Entertainment",
  "Government",
  "Non-Profit",
  "Technology",
  "Other",
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
    image: "",
    tech: [],
    link: "",
    github: "",
    start_date: "",
    end_date: "",
    challenge: "",
    solution: "",
    impact: "",
    industry: "",
  });
  const [techInput, setTechInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

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
        image: project.image,
        tech: project.tech,
        link: project.link,
        github: project.github,
        start_date: formatDateForInput(project.start_date),
        end_date: formatDateForInput(project.end_date),
        challenge: project.challenge || "",
        solution: project.solution || "",
        impact: project.impact || "",
        industry: project.industry || "",
      });
      setImagePreview(project.image || "");
    } else {
      setFormData({
        title: "",
        category: "",
        status: "planning",
        client: "",
        image: "",
        tech: [],
        link: "",
        github: "",
        start_date: "",
        end_date: "",
        challenge: "",
        solution: "",
        impact: "",
        industry: "",
      });
      setImagePreview("");
    }
    
    // Reset upload states when modal opens/closes
    setIsUploading(false);
    setUploadError(null);
    setSelectedFile(null);
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image if a new file was selected
    let finalFormData = { ...formData };
    if (selectedFile) {
      setIsUploading(true);
      setUploadError(null);
      
      try {
        const uploadedUrl = await handleImageUpload(selectedFile);
        finalFormData = { ...formData, image: uploadedUrl };
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Upload failed');
        console.error('Upload error:', error);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSave(finalFormData);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    setSelectedFile(file);
    setUploadError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");
    handleChange("image", "");
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
                {/* Industry */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Industry
                  </label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value: string) =>
                      handleChange("industry", value)
                    }
                  >
                    <SelectTrigger
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                      }}
                    >
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: "#1A1B23",
                        borderColor: "#374151",
                      }}
                    >
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry}
                          value={industry}
                          style={{ color: "#F8FAFC" }}
                        >
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                {/* Project Image */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Project Image
                  </label>
                  
                  {!imagePreview ? (
                    <label
                      htmlFor="project-image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-blue-500 hover:bg-gray-800/50"
                      style={{ 
                        borderColor: "#374151",
                        backgroundColor: "#0A0A0B"
                      }}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                          style={{ backgroundColor: "#374151" }}
                        >
                          <Upload className="w-8 h-8" style={{ color: "#94A3B8" }} />
                        </div>
                        <p className="mb-2 text-sm" style={{ color: "#94A3B8" }}>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs" style={{ color: "#6B7280" }}>
                          PNG, JPG or GIF (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="project-image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <div
                        className="relative w-full h-64 rounded-2xl overflow-hidden border-2"
                        style={{ borderColor: "#374151" }}
                      >
                        <Image
                          src={imagePreview}
                          alt="Project preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ 
                          backgroundColor: "#1A1B23",
                          color: "#F8FAFC"
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <label
                        htmlFor="project-image-upload-change"
                        className="absolute bottom-2 right-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                        style={{
                          backgroundColor: "#3B82F6",
                          color: "#F8FAFC"
                        }}
                      >
                        Change Image
                      </label>
                      <input
                        id="project-image-upload-change"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                      />
                    </div>
                  )}
                  
                  {uploadError && (
                    <div className="text-red-400 text-sm mt-2">
                      {uploadError}
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-400">Uploading image...</span>
                    </div>
                  )}
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
                {/* Challenge */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Challenge
                  </label>
                  <Textarea
                    value={formData.challenge}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("challenge", e.target.value)
                    }
                    placeholder="Describe the main challenges faced in this project..."
                    rows={3}
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                      color: "#F8FAFC",
                    }}
                  />
                </div>

                {/* Solution */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Solution
                  </label>
                  <Textarea
                    value={formData.solution}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("solution", e.target.value)
                    }
                    placeholder="Describe how you solved the challenges..."
                    rows={3}
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                      color: "#F8FAFC",
                    }}
                  />
                </div>

                {/* Impact */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#94A3B8" }}
                  >
                    Impact
                  </label>
                  <Textarea
                    value={formData.impact}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("impact", e.target.value)
                    }
                    placeholder="Describe the impact and results of the project..."
                    rows={3}
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                      color: "#F8FAFC",
                    }}
                  />
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
                    disabled={isUploading}
                    className="group"
                    style={{
                      backgroundColor: "#3B82F6",
                      color: "#F8FAFC",
                      border: "none",
                    }}
                  >
                    <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    {isUploading ? "Uploading..." : project ? "Update" : "Create"} Project
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
