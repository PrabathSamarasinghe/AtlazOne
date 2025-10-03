"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getDirectProjects,
  getDirectServices,
  getDirectTeamMembers,
  getDirectBlogPosts,
} from "@/lib/direct-queries";

interface Project {
  id: number;
  title: string;
  category: string;
  industry: string;
  image: string;
  tech: string[];
  link: string;
  github: string;
  challenge?: string;
  solution?: string;
  impact?: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  filepath: string;
  features: string[];
  price: number;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

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

interface CachedData {
  projects: Project[];
  services: Service[];
  team: TeamMember[];
  blogs: BlogPost[];
  lastUpdated: number;
}

interface DataCacheContextType {
  data: CachedData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  isDataReady: (section?: keyof Omit<CachedData, "lastUpdated">) => boolean;
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(
  undefined
);

const CACHE_KEY = "atlaz_data_cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export function DataCacheProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CachedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const isCacheValid = (cachedData: CachedData): boolean => {
    const now = Date.now();
    return now - cachedData.lastUpdated < CACHE_DURATION;
  };

 
  const loadFromCache = (): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsedData = JSON.parse(cached) as CachedData;
        if (isCacheValid(parsedData)) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error loading from cache:", error);
    }
    return null;
  };

  
  const saveToCache = (data: CachedData) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to cache:", error);
    }
  };

  
  const fetchAllData = async (): Promise<CachedData> => {
    const [projects, services, team, blogs] = await Promise.all([
      getDirectProjects(),
      getDirectServices(),
      getDirectTeamMembers(),
      getDirectBlogPosts(),
    ]);

    return {
      projects,
      services,
      team,
      blogs,
      lastUpdated: Date.now(),
    };
  };


  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const newData = await fetchAllData();
      setData(newData);
      saveToCache(newData);
      console.log("Data cache refreshed successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      console.error("Error refreshing data cache:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const isDataReady = (
    section?: keyof Omit<CachedData, "lastUpdated">
  ): boolean => {
    if (!data) return false;
    if (!section) return true; 

    switch (section) {
      case "projects":
        return data.projects.length > 0;
      case "services":
        return data.services.length > 0;
      case "team":
        return data.team.length > 0;
      case "blogs":
        return data.blogs.length > 0;
      default:
        return true;
    }
  };

  
  useEffect(() => {
    const initializeData = async () => {
      
      const cachedData = loadFromCache();

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        console.log("Data loaded from cache");

        // Optionally refresh in background if cache is getting old
        const cacheAge = Date.now() - cachedData.lastUpdated;
        const refreshThreshold = 15 * 60 * 1000; // 15 minutes

        if (cacheAge > refreshThreshold) {
          console.log("Cache is getting old, refreshing in background...");
          refreshData(); 
        }
      } else {
        
        console.log("No valid cache found, fetching fresh data...");
        await refreshData();
      }
    };

    initializeData();
  }, []);

  const contextValue: DataCacheContextType = {
    data,
    loading,
    error,
    refreshData,
    isDataReady,
  };

  return (
    <DataCacheContext.Provider value={contextValue}>
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  const context = useContext(DataCacheContext);
  if (context === undefined) {
    throw new Error("useDataCache must be used within a DataCacheProvider");
  }
  return context;
}

// Convenience hooks for specific data types
export function useProjects() {
  const { data, loading, isDataReady } = useDataCache();
  return {
    projects: data?.projects || [],
    loading: loading || !isDataReady("projects"),
    isReady: isDataReady("projects"),
  };
}

export function useServices() {
  const { data, loading, isDataReady } = useDataCache();
  return {
    services: data?.services || [],
    loading: loading || !isDataReady("services"),
    isReady: isDataReady("services"),
  };
}

export function useTeam() {
  const { data, loading, isDataReady } = useDataCache();
  return {
    team: data?.team || [],
    loading: loading || !isDataReady("team"),
    isReady: isDataReady("team"),
  };
}

export function useBlogs() {
  const { data, loading, isDataReady } = useDataCache();
  return {
    blogs: data?.blogs || [],
    loading: loading || !isDataReady("blogs"),
    isReady: isDataReady("blogs"),
  };
}
