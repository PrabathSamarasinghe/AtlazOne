"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/contexts/DataCacheContext";
import LoadingComponent from "@/components/landing/LoadingComponent";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const router = useRouter();
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1C1C" }}>
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => router.push("/#blog")}
            className="flex items-center text-white hover:text-red-500 transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </motion.div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "white" }}
          >
            All <span style={{ color: "#ff3131" }}>Blog Posts</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#BDC3C7" }}
          >
            Discover insights, trends, and expert opinions from our tech team
          </p>{" "}
          <div className="mt-4" style={{ color: "#BDC3C7" }}>
            {blogs.length} {blogs.length === 1 ? "article" : "articles"} found
          </div>
        </motion.div>
        {/* Blog Posts Grid */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post: BlogPost, index: number) => (
            <motion.article
              key={post.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 h-full"
                style={{
                  backgroundColor: "#2E2E2E",
                  borderColor: "#BDC3C7",
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "linear-gradient(to top, #1C1C1C, transparent, transparent)",
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    {" "}
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: "#ff3131",
                        color: "white",
                      }}
                    >
                      {post.tags?.[0] || "Tech"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col">
                  <div className="flex-1">
                    <div
                      className="flex items-center text-sm mb-4"
                      style={{ color: "#BDC3C7" }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-3 transition-all duration-300"
                      style={{ color: "white" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mb-6 leading-relaxed"
                      style={{ color: "#BDC3C7" }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                  <div
                    className="flex items-center transition-colors duration-300 mt-auto cursor-pointer"
                    style={{ color: "#ff3131" }}
                    onClick={() => setSelectedBlog(post)}
                  >
                    <span className="font-medium">Read More</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl" style={{ color: "#BDC3C7" }}>
              No blog posts found.
            </p>
          </div>
        )}
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                onClick={() => setSelectedBlog(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  {" "}
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                    {selectedBlog.tags?.[0] || "Tech"}
                  </span>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{selectedBlog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(selectedBlog.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span>{selectedBlog.readTime}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {selectedBlog.title}
                </h1>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedBlog.excerpt}
                  </p>

                  {/* Placeholder for full content - you can replace this with actual blog content */}
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                      This is where the full blog content would appear. You can
                      fetch the complete content from your API and display it
                      here. The content can include multiple paragraphs, images,
                      code blocks, and other rich content elements.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
