"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Clock, Tag } from "lucide-react";
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

interface BlogViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

const statusColors = {
  published: "text-green-400 bg-green-400/10 border-green-500",
  draft: "text-orange-400 bg-orange-400/10 border-orange-500",
  scheduled: "text-blue-400 bg-blue-400/10 border-blue-500",
};

export default function BlogViewModal({
  isOpen,
  onClose,
  post,
}: BlogViewModalProps) {
  if (!post) return null;

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
            <div
              className="rounded-2xl p-6 w-full max-w-4xl border my-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "#1A1B23", borderColor: "#374151" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  View Blog Post
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                  style={{ backgroundColor: "#374151", color: "#94A3B8" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Tabs defaultValue="details" className="space-y-6">
                <TabsList
                  className="grid w-full grid-cols-2"
                  style={{ backgroundColor: "#374151" }}
                >
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-gray-600"
                    style={{ color: "#F8FAFC" }}
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-gray-600"
                    style={{ color: "#F8FAFC" }}
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Status and Category */}
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${
                        statusColors[post.status]
                      }`}
                    >
                      {post.status.toUpperCase()}
                    </span>
                    <span
                      className="px-3 py-1 text-sm rounded-full border"
                      style={{
                        backgroundColor: "#0A0A0B",
                        color: "#94A3B8",
                        borderColor: "#374151",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Title
                    </label>
                    <div
                      className="p-3 rounded-lg border text-lg font-semibold"
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                      }}
                    >
                      {post.title}
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Excerpt
                    </label>
                    <div
                      className="p-3 rounded-lg border min-h-[80px]"
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                      }}
                    >
                      {post.excerpt}
                    </div>
                  </div>

                  {/* Author, Publish Date, Read Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        <User className="w-4 h-4 inline mr-1" />
                        Author
                      </label>
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      >
                        {post.author}
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Publish Date
                      </label>
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      >
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        Read Time
                      </label>
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                          color: "#F8FAFC",
                        }}
                      >
                        {post.read_time}
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  {post.image && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        Featured Image
                      </label>
                      <div
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: "#0A0A0B",
                          borderColor: "#374151",
                        }}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <p
                          className="mt-2 text-sm break-all"
                          style={{ color: "#94A3B8" }}
                        >
                          {post.image}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#94A3B8" }}
                      >
                        <Tag className="w-4 h-4 inline mr-1" />
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm rounded-full border"
                            style={{
                              backgroundColor: "#0A0A0B",
                              color: "#3B82F6",
                              borderColor: "#3B82F6",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#94A3B8" }}
                    >
                      Content
                    </label>
                    <div
                      className="p-4 rounded-lg border min-h-[200px] whitespace-pre-wrap"
                      style={{
                        backgroundColor: "#0A0A0B",
                        borderColor: "#374151",
                        color: "#F8FAFC",
                        fontFamily: "monospace",
                      }}
                    >
                      {post.content}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <div
                    className="rounded-2xl p-8 border"
                    style={{
                      backgroundColor: "#0A0A0B",
                      borderColor: "#374151",
                    }}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                      />
                    )}

                    <div className="space-y-4">
                      <div
                        className="flex items-center space-x-4 text-sm"
                        style={{ color: "#94A3B8" }}
                      >
                        <span
                          className="px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "#3B82F6",
                            color: "#F8FAFC",
                          }}
                        >
                          {post.category}
                        </span>
                        <span>{post.author}</span>
                        <span>
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span>{post.read_time}</span>
                      </div>

                      <h1
                        className="text-3xl font-bold"
                        style={{ color: "#F8FAFC" }}
                      >
                        {post.title}
                      </h1>

                      <p
                        className="text-xl leading-relaxed"
                        style={{ color: "#94A3B8" }}
                      >
                        {post.excerpt}
                      </p>

                      <div className="prose prose-invert max-w-none">
                        <div
                          className="leading-relaxed whitespace-pre-wrap"
                          style={{ color: "#F8FAFC" }}
                        >
                          {post.content}
                        </div>
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div
                          className="flex flex-wrap gap-2 pt-4 border-t"
                          style={{ borderColor: "#374151" }}
                        >
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-sm rounded-full"
                              style={{
                                backgroundColor: "#374151",
                                color: "#94A3B8",
                              }}
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