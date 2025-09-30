import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async () => {
  try {
    const { data: blogs, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false });

    if (error) throw error;

    return ApiResponse.success(blogs);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return ApiResponse.error("Failed to fetch blog posts");
  }
};
