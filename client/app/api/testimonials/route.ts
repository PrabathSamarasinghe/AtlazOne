import { supabase } from "@/lib/supabase";

export const GET = async () => {
  try {
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*");

    if (error) throw error;

    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch testimonials" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
