"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDirectBlogPosts } from "@/lib/direct-queries";
import { useBlogs } from "@/contexts/DataCacheContext";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export default function Blog() {
  const { blogs: blogPosts, loading } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          {" "}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            style={{ color: "white" }}
          >
            Latest <span style={{ color: "#ff3131" }}>Insights</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
            style={{ color: "#BDC3C7" }}
          >
            Stay updated with the latest trends and insights from our tech
            experts
          </p>{" "}
        </motion.div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {loading
            ? // Skeleton loader for blog posts
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  className="rounded-2xl overflow-hidden h-full"
                  style={{ backgroundColor: "#2E2E2E" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Image skeleton */}
                  <div className="relative aspect-video overflow-hidden">
                    <div
                      className="w-full h-full animate-pulse"
                      style={{ backgroundColor: "#3C3C3C" }}
                    />
                    <div className="absolute top-4 left-4">
                      <div
                        className="w-16 h-6 rounded-full animate-pulse"
                        style={{ backgroundColor: "#4C4C4C" }}
                      />
                    </div>
                  </div>

                  {/* Content skeleton */}
                  <div className="p-6 flex flex-col">
                    <div className="flex-1">
                      {/* Author and date skeleton */}
                      <div className="flex items-center text-sm mb-4 space-x-4">
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded animate-pulse mr-2"
                            style={{ backgroundColor: "#4C4C4C" }}
                          />
                          <div
                            className="w-16 h-4 rounded animate-pulse"
                            style={{ backgroundColor: "#4C4C4C" }}
                          />
                        </div>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded animate-pulse mr-2"
                            style={{ backgroundColor: "#4C4C4C" }}
                          />
                          <div
                            className="w-20 h-4 rounded animate-pulse"
                            style={{ backgroundColor: "#4C4C4C" }}
                          />
                        </div>
                        <div
                          className="w-12 h-4 rounded animate-pulse"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                      </div>

                      {/* Title skeleton */}
                      <div className="mb-3">
                        <div
                          className="w-full h-6 rounded animate-pulse mb-2"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                        <div
                          className="w-3/4 h-6 rounded animate-pulse"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                      </div>

                      {/* Excerpt skeleton */}
                      <div className="mb-6 space-y-2">
                        <div
                          className="w-full h-4 rounded animate-pulse"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                        <div
                          className="w-full h-4 rounded animate-pulse"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                        <div
                          className="w-2/3 h-4 rounded animate-pulse"
                          style={{ backgroundColor: "#4C4C4C" }}
                        />
                      </div>
                    </div>

                    {/* Read More button skeleton */}
                    <div className="flex items-center mt-auto">
                      <div
                        className="w-20 h-5 rounded animate-pulse mr-2"
                        style={{ backgroundColor: "#4C4C4C" }}
                      />
                      <div
                        className="w-5 h-5 rounded animate-pulse"
                        style={{ backgroundColor: "#4C4C4C" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            : blogPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group cursor-pointer"
                  data-blog-post
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {" "}
                  <div
                    className="rounded-2xl overflow-hidden  transition-all duration-300 h-full"
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
                    </div>{" "}
                    <div className="p-6 flex flex-col ">
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
        </div>{" "}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {" "}
          <button
            className="px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "#a93226",
              color: "white",
              boxShadow: "0 10px 25px rgba(169, 50, 38, 0.15)",
            }}
            onClick={() => router.push("/blogs")}
          >
            See More
          </button>
        </motion.div>
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
    </section>
  );
}
