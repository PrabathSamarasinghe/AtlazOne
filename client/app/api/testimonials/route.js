import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async () => {
  try {
    const { data: testimonials, error } = await supabase.from("testimonials").select("*");

    if (error) throw error;

    return ApiResponse.success(testimonials);
  } catch (error) {
    console.error("Database error:", error);
    return ApiResponse.error("Error fetching Testimonials");
  }
};
