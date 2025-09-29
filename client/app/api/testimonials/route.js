import { supabase } from "@/lib/supabase";

export const GET = async () => {
  try {
    const { data: testimonials, error } = await supabase.from("testimonials").select("*");

    if (error) throw error;

    return new Response(JSON.stringify(testimonials), {
      headers: { "Content-Type": "application/json", status: 200 },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Error fetching Testimonials", { status: 500 });
  }
};
