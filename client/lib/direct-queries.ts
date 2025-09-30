/**
 * Direct database queries to bypass API caching issues
 * These functions query Supabase directly from client components
 */

import { supabase } from '@/lib/supabase';

// Check if we're on the client side
const isClient = () => typeof window !== 'undefined';

// Blog Posts
export const getDirectBlogPosts = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return [];
  }
  
  try {
    const { data: blogs, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }

    return blogs || [];
  } catch (error) {
    console.error("Direct blog posts query failed:", error);
    return [];
  }
};

// Team Members
export const getDirectTeamMembers = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return [];
  }
  
  try {
    const { data: team, error } = await supabase
      .from("team")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }

    // Transform data to match expected format
    const modifiedRows = team?.map(row => ({
      ...row,
      social: {
        linkedin: row.linkedin,
        twitter: row.twitter,
        github: row.github
      }
    })) || [];

    return modifiedRows;
  } catch (error) {
    console.error("Direct team members query failed:", error);
    return [];
  }
};

// Services
export const getDirectServices = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return [];
  }
  
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*");

    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }

    return services || [];
  } catch (error) {
    console.error("Direct services query failed:", error);
    return [];
  }
};

// Projects
export const getDirectProjects = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return [];
  }
  
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    return projects || [];
  } catch (error) {
    console.error("Direct projects query failed:", error);
    return [];
  }
};

// Testimonials
export const getDirectTestimonials = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return [];
  }
  
  try {
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*");

    if (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }

    return testimonials || [];
  } catch (error) {
    console.error("Direct testimonials query failed:", error);
    return [];
  }
};

// Dashboard Stats (for admin)
export const getDirectDashboardStats = async () => {
  if (!isClient()) {
    console.warn('Direct queries should only be used on client side');
    return {
      teamMembers: 0,
      activeProjects: 0,
      totalClients: 0,
      revenue: "0",
      blogPosts: 0
    };
  }
  
  try {
    // Get counts from each table
    const [
      { count: teamCount },
      { count: projectsCount },
      { count: blogCount },
      { count: testimonialsCount }
    ] = await Promise.all([
      supabase.from("team").select("*", { count: 'exact', head: true }),
      supabase.from("projects").select("*", { count: 'exact', head: true }),
      supabase.from("blog_posts").select("*", { count: 'exact', head: true }),
      supabase.from("testimonials").select("*", { count: 'exact', head: true })
    ]);

    return {
      teamMembers: teamCount || 0,
      activeProjects: projectsCount || 0,
      totalClients: testimonialsCount || 0,
      revenue: "0", // This would need to come from another source
      blogPosts: blogCount || 0
    };
  } catch (error) {
    console.error("Direct dashboard stats query failed:", error);
    return {
      teamMembers: 0,
      activeProjects: 0,
      totalClients: 0,
      revenue: "0",
      blogPosts: 0
    };
  }
};

// Real-time subscription setup (optional - for live updates)
export const subscribeToTableChanges = (table: string, callback: () => void) => {
  try {
    const subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        () => {
          console.log(`Change detected in ${table} table`);
          callback();
        }
      )
      .subscribe();

    return subscription;
  } catch (error) {
    console.warn(`Failed to subscribe to ${table} changes:`, error);
    return null;
  }
};

// Clean up subscription
export const unsubscribeFromChanges = (subscription: any) => {
  try {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  } catch (error) {
    console.warn('Failed to unsubscribe from changes:', error);
  }
};