"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Eye, Plus, Upload } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  date: string;
  read_time: string;
  tags: string[];
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<BlogPost, "id">) => void;
  post?: BlogPost | null;
}

const categories = [
  "AI & Technology",
  "Mobile Development",
  "Web Development",
  "UI/UX Design",
  "Security",
  "Cloud Computing",
  "Data Science",
];

const authors = [
  "Sarah Chen",
  "Marcus Johnson",
  "Alex Rodriguez",
  "Emily Davis",
];

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
];

export default function BlogModal({
  isOpen,
  onClose,
  onSave,
  post,
}: BlogModalProps) {
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Sarah Chen",
    category: "",
    status: "draft",
    date: new Date().toISOString().split("T")[0],
    read_time: "5 min read",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        image: post.image || "",
        author: post.author || "Sarah Chen",
        category: post.category || "",
        status: post.status || "draft",
        date: post.date || new Date().toISOString().split("T")[0],
        read_time: post.read_time || "5 min read",
        tags: Array.isArray(post.tags) ? post.tags : [],
      });
      setImagePreview(post.image || "");
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        author: "Sarah Chen",
        category: "",
        status: "draft",
        date: new Date().toISOString().split("T")[0],
        read_time: "5 min read",
        tags: [],
      });
      setImagePreview("");
    }
    
    // Clear the tag input and reset upload states when modal opens/closes
    setTagInput("");
    setIsUploading(false);
    setUploadError(null);
    setSelectedFile(null);
  }, [post, isOpen]);

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

    try {
      const response = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts/create", {
        method: post ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      const savedPost = await response.json();
      onSave(savedPost);
    } catch (error) {
      console.log("Error saving post:", error);
      // Fallback to save form data if API call fails
      onSave(finalFormData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag) => tag !== tagToRemove),
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {" "}
            <div
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl border border-gray-700 my-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  {post ? "Edit Blog Post" : "Create New Post"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#374151", color: "#94A3B8" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>{" "}
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
                    {/* Basic Information */}{" "}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Title
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Enter post title"
                        required
                        className="text-lg font-semibold"
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Excerpt
                      </label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) =>
                          handleChange("excerpt", e.target.value)
                        }
                        placeholder="Brief description of the post..."
                        rows={3}
                        required
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Author
                        </label>
                        <Select
                          value={formData.author}
                          onValueChange={(value) =>
                            handleChange("author", value)
                          }
                        >
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {authors.map((author) => (
                              <SelectItem
                                key={author}
                                value={author}
                                className="text-white hover:bg-gray-700"
                              >
                                {author}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleChange("category", value)
                          }
                        >
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {categories.map((category) => (
                              <SelectItem
                                key={category}
                                value={category}
                                className="text-white hover:bg-gray-700"
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Status
                        </label>
                        <Select
                          value={formData.status}
                          onValueChange={(
                            value: "published" | "draft" | "scheduled"
                          ) => handleChange("status", value)}
                        >
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                                className="text-white hover:bg-gray-700"
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Publish Date
                        </label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            handleChange("date", e.target.value)
                          }
                          required
                          className="bg-gray-700/50 border-gray-600 text-white focus:border-orange-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Read Time
                        </label>
                        <Input
                          value={formData.read_time}
                          onChange={(e) =>
                            handleChange("read_time", e.target.value)
                          }
                          placeholder="5 min read"
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                        />
                      </div>
                    </div>
                    {/* Featured Image */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Featured Image
                      </label>
                      
                      {!imagePreview ? (
                        <label
                          htmlFor="blog-image-upload"
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
                            id="blog-image-upload"
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
                              alt="Featured image preview"
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
                            htmlFor="blog-image-upload-change"
                            className="absolute bottom-2 right-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                            style={{
                              backgroundColor: "#3B82F6",
                              color: "#F8FAFC"
                            }}
                          >
                            Change Image
                          </label>
                          <input
                            id="blog-image-upload-change"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags
                      </label>
                      <div className="flex space-x-2 mb-3">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add a tag"
                          onKeyPress={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(formData.tags || []).map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="inline-flex items-center px-3 py-1 text-sm bg-orange-600/20 text-orange-300 rounded-full cursor-pointer hover:bg-orange-600/30 border border-orange-500/30 transition-colors"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <X className="w-3 h-3 ml-1" />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) =>
                          handleChange("content", e.target.value)
                        }
                        placeholder="Write your blog post content here..."
                        rows={12}
                        required
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 font-mono"
                      />
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>{" "}
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
                        {isUploading ? "Uploading..." : post ? "Update" : "Create"} Post
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
                    {imagePreview && (
                      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                        <Image
                          src={imagePreview}
                          alt={formData.title || "Blog post featured image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                          {formData.category}
                        </span>
                        <span>{formData.author}</span>
                        <span>
                          {new Date(formData.date).toLocaleDateString()}
                        </span>
                        <span>{formData.read_time}</span>
                      </div>

                      <h1 className="text-3xl font-bold text-white">
                        {formData.title || "Post Title"}
                      </h1>

                      <p className="text-xl text-gray-300 leading-relaxed">
                        {formData.excerpt}
                      </p>

                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {formData.content ||
                            "Your content will appear here..."}
                        </div>
                      </div>

                      {(formData.tags || []).length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                          {(formData.tags || []).map((tag, index) => (
                            <span
                              key={`preview-${tag}-${index}`}
                              className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
