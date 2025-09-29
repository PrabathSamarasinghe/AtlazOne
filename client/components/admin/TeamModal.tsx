"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Github, Linkedin, Twitter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, "id">) => void;
  member?: TeamMember | null;
}

const roleOptions = [
  "CEO & Founder",
  "CTO",
  "Lead Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Project Manager",
  "Marketing Manager",
  "Business Analyst",
  "QA Engineer",
];

export default function TeamModal({
  isOpen,
  onClose,
  onSave,
  member,
}: TeamModalProps) {
  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    image: "",
    bio: "",
    social: {
      linkedin: "",
      twitter: "",
      github: "",
    },
  });

  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio,
        social: {
          linkedin: member.social.linkedin || "",
          twitter: member.social.twitter || "",
          github: member.social.github || "",
        },
      });
    } else {
      setFormData({
        name: "",
        role: "",
        image: "",
        bio: "",
        social: {
          linkedin: "",
          twitter: "",
          github: "",
        },
      });
    }
  }, [member, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!formData.role.trim()) {
      alert("Role is required");
      return;
    }
    if (!formData.bio.trim()) {
      alert("Bio is required");
      return;
    }

    onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    if (field === "social") {
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, ...value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSocialChange = (platform: keyof typeof formData.social, value: string) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [platform]: value },
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
              className="rounded-2xl p-6 w-full max-w-3xl border my-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  {member ? "Edit Team Member" : "Add New Team Member"}
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
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#94A3B8" }}
                        >
                          Full Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter full name"
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
                          Role *
                        </label>
                        <div className="relative">
                          <Input
                            value={formData.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            placeholder="Enter role or select from suggestions"
                            required
                            list="role-options"
                            style={{
                              backgroundColor: "#0A0A0B",
                              borderColor: "#374151",
                              color: "#F8FAFC",
                            }}
                          />
                          <datalist id="role-options">
                            {roleOptions.map((role) => (
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
                          placeholder="https://example.com/profile.jpg"
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
                        Provide a direct URL to the team member's profile image
                      </p>
                    </div>

                    {/* Bio */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Bio *
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        placeholder="Write a brief bio about the team member..."
                        rows={4}
                        required
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      />
                      <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                        Keep it concise and professional (recommended: 100-200 characters)
                      </p>
                    </div>

                    {/* Social Media Links */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-4"
                        style={{ color: "#94A3B8" }}
                      >
                        Social Media Links
                      </label>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#0A0A0B" }}
                          >
                            <Linkedin className="w-5 h-5" style={{ color: "#0077B5" }} />
                          </div>
                          <Input
                            value={formData.social.linkedin}
                            onChange={(e) =>
                              handleSocialChange("linkedin", e.target.value)
                            }
                            placeholder="https://linkedin.com/in/username"
                            style={{
                              backgroundColor: "#0A0A0B",
                              borderColor: "#374151",
                              color: "#F8FAFC",
                            }}
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#0A0A0B" }}
                          >
                            <Twitter className="w-5 h-5" style={{ color: "#1DA1F2" }} />
                          </div>
                          <Input
                            value={formData.social.twitter}
                            onChange={(e) =>
                              handleSocialChange("twitter", e.target.value)
                            }
                            placeholder="https://twitter.com/username"
                            style={{
                              backgroundColor: "#0A0A0B",
                              borderColor: "#374151",
                              color: "#F8FAFC",
                            }}
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#0A0A0B" }}
                          >
                            <Github className="w-5 h-5" style={{ color: "#F8FAFC" }} />
                          </div>
                          <Input
                            value={formData.social.github}
                            onChange={(e) =>
                              handleSocialChange("github", e.target.value)
                            }
                            placeholder="https://github.com/username"
                            style={{
                              backgroundColor: "#0A0A0B",
                              borderColor: "#374151",
                              color: "#F8FAFC",
                            }}
                          />
                        </div>
                      </div>
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
                        {member ? "Update" : "Create"} Member
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#0A0A0B", borderColor: "#374151" }}>
                    <div className="text-center max-w-sm mx-auto">
                      {/* Profile Image */}
                      <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
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
                            <User className="w-12 h-12" style={{ color: "#94A3B8" }} />
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "#F8FAFC" }}
                      >
                        {formData.name || "Team Member Name"}
                      </h3>

                      {/* Role */}
                      <div
                        className="font-medium mb-4"
                        style={{ color: "#3B82F6" }}
                      >
                        {formData.role || "Role"}
                      </div>

                      {/* Bio */}
                      <p
                        className="text-sm mb-6 leading-relaxed"
                        style={{ color: "#94A3B8" }}
                      >
                        {formData.bio || "Bio information will appear here..."}
                      </p>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-3">
                        {(formData.social.linkedin || formData.social.twitter || formData.social.github) ? (
                          <>
                            {formData.social.linkedin && (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#374151" }}
                              >
                                <Linkedin
                                  className="w-5 h-5"
                                  style={{ color: "#94A3B8" }}
                                />
                              </div>
                            )}
                            {formData.social.twitter && (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#374151" }}
                              >
                                <Twitter
                                  className="w-5 h-5"
                                  style={{ color: "#94A3B8" }}
                                />
                              </div>
                            )}
                            {formData.social.github && (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#374151" }}
                              >
                                <Github
                                  className="w-5 h-5"
                                  style={{ color: "#94A3B8" }}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-xs" style={{ color: "#6B7280" }}>
                            Social links will appear here when added
                          </p>
                        )}
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