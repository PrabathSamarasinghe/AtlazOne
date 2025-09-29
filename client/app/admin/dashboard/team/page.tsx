"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Github,
  Linkedin,
  Twitter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeamModal from "@/components/admin/TeamModal";
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

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/team");
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTeam(team.filter((member) => member.id !== id));
      } else {
        alert("Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Error deleting team member");
    }
  };

  const handleSaveMember = async (memberData: Omit<TeamMember, "id">) => {
    try {
      const url = editingMember
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team/create";
      const method = editingMember ? "PATCH" : "POST";

      const payload = editingMember
        ? { ...memberData, id: editingMember.id }
        : memberData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchTeamMembers();
        setIsModalOpen(false);
        setEditingMember(null);
      } else {
        alert("Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Error saving team member");
    }
  };

  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#F8FAFC" }}
          >
            Team <span style={{ color: "#3B82F6" }}>Management</span>
          </h1>
          <p style={{ color: "#94A3B8" }}>
            Manage your team members and their information
          </p>
        </div>
        <Button
          onClick={handleAddMember}
          className="group flex items-center space-x-2"
          style={{
            backgroundColor: "#3B82F6",
            color: "#F8FAFC",
            border: "none",
          }}
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Add Team Member</span>
        </Button>
      </motion.div>

      {/* Search and Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "#94A3B8" }}
          />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-80"
            style={{
              backgroundColor: "#1A1B23",
              borderColor: "#374151",
              color: "#F8FAFC",
            }}
          />
        </div>
        <div
          className="flex items-center space-x-2 text-sm"
          style={{ color: "#94A3B8" }}
        >
          <Users className="w-4 h-4" />
          <span>
            {filteredTeam.length} of {team.length} members
          </span>
        </div>
      </motion.div>

      {/* Team Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 border animate-pulse"
              style={{
                backgroundColor: "#1A1B23",
                borderColor: "#374151",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-20 h-20 rounded-full bg-gray-600 mx-auto mb-4" />
              <div className="h-4 bg-gray-600 rounded mb-2" />
              <div className="h-3 bg-gray-700 rounded mb-4" />
              <div className="h-16 bg-gray-700 rounded mb-4" />
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-8 h-8 bg-gray-600 rounded-full" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeam.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#1A1B23",
                borderColor: "#374151",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditMember(member)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "#3B82F6",
                    color: "#F8FAFC",
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#F8FAFC",
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  />
                </div>

                <h3
                  className="text-lg font-bold mb-2 transition-all duration-300"
                  style={{ color: "#F8FAFC" }}
                >
                  {member.name}
                </h3>
                
                <div
                  className="font-medium mb-3"
                  style={{ color: "#3B82F6" }}
                >
                  {member.role}
                </div>

                <p
                  className="text-sm mb-4 leading-relaxed line-clamp-3"
                  style={{ color: "#94A3B8" }}
                >
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <Linkedin
                        className="w-4 h-4 transition-colors"
                        style={{ color: "#94A3B8" }}
                      />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <Twitter
                        className="w-4 h-4 transition-colors"
                        style={{ color: "#94A3B8" }}
                      />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <Github
                        className="w-4 h-4 transition-colors"
                        style={{ color: "#94A3B8" }}
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Hover effect background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredTeam.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Users
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "#374151" }}
          />
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#94A3B8" }}>
            {searchTerm ? "No team members found" : "No team members yet"}
          </h3>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            {searchTerm
              ? "Try adjusting your search terms"
              : "Start building your team by adding the first member"}
          </p>
          {!searchTerm && (
            <Button
              onClick={handleAddMember}
              style={{
                backgroundColor: "#3B82F6",
                color: "#F8FAFC",
                border: "none",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Team Member
            </Button>
          )}
        </motion.div>
      )}

      {/* Team Modal */}
      <TeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        member={editingMember}
      />
    </div>
  );
}