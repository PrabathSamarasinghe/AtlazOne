"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  read_time: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await fetch("/api/blogposts");
      const data = await response.json();
      setBlogPosts(data);
    };

    fetchBlogPosts();

    return () => {
      setBlogPosts([]);
    };
  }, []);

  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <div className="container mx-auto px-4 sm:px-6">        <motion.div
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
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group cursor-pointer"
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
                      {post.category}
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
                      <span>{post.read_time}</span>
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
                    className="flex items-center transition-colors duration-300 mt-auto "
                    style={{ color: "#ff3131" }}
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
          >
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
}
