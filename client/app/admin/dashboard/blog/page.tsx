"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlogModal from "@/components/admin/BlogModal";
import BlogViewModal from "@/components/admin/BlogViewModal";
import { getDirectBlogPosts } from "@/lib/direct-queries";

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

// const initialPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "The Future of AI in Web Development",
//     excerpt:
//       "Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
//     image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
//     author: "Sarah Chen",
//     category: "AI & Technology",
//     status: "published",
//     date: "2024-01-15",
//     read_time: "5 min read",
//     tags: ["AI", "Web Development", "Technology"],
//   },
//   {
//     id: 2,
//     title: "Building Scalable Mobile Apps in 2024",
//     excerpt:
//       "Best practices and modern approaches for developing mobile applications that can handle millions of users.",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
//     image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
//     author: "Marcus Johnson",
//     category: "Mobile Development",
//     status: "draft",
//     date: "2024-02-01",
//     read_time: "7 min read",
//     tags: ["Mobile", "React Native", "Scalability"],
//   },
// ];

const statusColors = {
  published: "text-green-400 border-green-500",
  draft: "text-orange-400 border-orange-500",
  scheduled: "text-blue-400 border-blue-500",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDirectBlogPosts();
        setPosts(data);
        console.log('Admin blog posts fetched directly from database:', data.length);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleViewPost = (post: BlogPost) => {
    setViewingPost(post);
    setIsViewModalOpen(true);
  };

  const handleDeletePost = async (id: number) => {
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      return;
    }
    setPosts(posts?.filter((p) => p.id !== id));
  };

  const handleSavePost = (postData: Omit<BlogPost, "id">) => {
    if (editingPost) {
      setPosts(
        posts?.map((p) =>
          p.id === editingPost?.id ? { ...postData, id: editingPost?.id } : p
        )
      );
    } else {
      const newPost = {
        ...postData,
        id: Math.max(...(posts || []).map((p) => p.id)) + 1,
      };
      setPosts([...(posts || []), newPost]);
    }
    setIsModalOpen(false);
  };

  const filteredPosts = posts?.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {" "}
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
            Manage <span style={{ color: "#3B82F6" }}>Blog Posts</span>
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Create, edit, and manage your blog content
          </p>
        </div>
        <Button
          onClick={handleAddPost}
          className="font-semibold rounded-lg group"
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
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          New Post
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {" "}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: "#94A3B8" }}
          />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            style={{
              backgroundColor: "#1A1B23",
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
        <Button
          variant="outline"
          className="font-semibold"
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
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts?.map((post, index) => (
          <motion.div
            key={post.id}
            className="rounded-2xl p-6 transition-all duration-300 group"
            style={{
              backgroundColor: "#1A1B23",
              border: "1px solid #374151",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3B82F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#374151";
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Image */}
              <div className="relative w-full lg:w-48 h-32 lg:h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />{" "}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10, 10, 11, 0.6) 0%, transparent 100%)",
                  }}
                />
              </div>
              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      statusColors[post?.status]
                    }`}
                    style={{ backgroundColor: "#0A0A0B" }}
                  >
                    {post?.status?.toUpperCase()}
                  </span>
                  <span className="text-sm" style={{ color: "#94A3B8" }}>
                    {post?.category}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold transition-all duration-300 group-hover:text-blue-400"
                  style={{ color: "#F8FAFC" }}
                >
                  {post?.title}
                </h3>
                <p className="line-clamp-2" style={{ color: "#94A3B8" }}>
                  {post?.excerpt}
                </p>{" "}
                <div
                  className="flex items-center text-sm space-x-4"
                  style={{ color: "#94A3B8" }}
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post?.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post?.date).toLocaleDateString()}
                  </div>
                  <span>{post?.read_time}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post?.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full border"
                      style={{
                        backgroundColor: "#0A0A0B",
                        color: "#94A3B8",
                        borderColor: "#374151",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {post?.tags?.length > 3 && (
                    <span
                      className="px-2 py-1 text-xs rounded-full border"
                      style={{
                        backgroundColor: "#0A0A0B",
                        color: "#94A3B8",
                        borderColor: "#374151",
                      }}
                    >
                      +{post?.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>{" "}
              {/* Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#22C55E" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#16A34A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#22C55E";
                  }}
                >
                  <Eye className="w-5 h-5" style={{ color: "#F8FAFC" }} />
                </button>
                <button
                  onClick={() => handleEditPost(post)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#3B82F6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3B82F6";
                  }}
                >
                  <Edit3 className="w-5 h-5" style={{ color: "#F8FAFC" }} />
                </button>
                <button
                  onClick={() => handleDeletePost(post?.id)}
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
        post={editingPost}
      />
    </div>
  );
}
