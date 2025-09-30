import { useState, useEffect } from "react";
import { getDirectProjects } from "@/lib/direct-queries";
import { getDirectServices } from "@/lib/direct-queries";
import { getDirectTeamMembers } from "@/lib/direct-queries";
import { getDirectBlogPosts } from "@/lib/direct-queries";
import { getDirectTestimonials } from "@/lib/direct-queries";

interface MainPageData {
  projects: any[];
  services: any[];
  team: any[];
  blogPosts: any[];
  testimonials: any[];
}

export const useMainPageData = () => {
  const [data, setData] = useState<MainPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Starting to fetch all main page data...");

      // Fetch all data in parallel for better performance
      const [projects, services, team, blogPosts, testimonials] =
        await Promise.all([
          getDirectProjects(),
          getDirectServices(),
          getDirectTeamMembers(),
          getDirectBlogPosts(),
          getDirectTestimonials(),
        ]);

      const mainPageData = {
        projects,
        services,
        team,
        blogPosts,
        testimonials,
      };

      setData(mainPageData);
      console.log("✅ All main page data fetched successfully:", {
        projects: projects.length,
        services: services.length,
        team: team.length,
        blogPosts: blogPosts.length,
        testimonials: testimonials.length,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch main page data";
      setError(errorMessage);
      console.error("❌ Error fetching main page data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const refetch = () => {
    fetchAllData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
