import { supabase } from "@/lib/supabase";

export const GET = async () => {
  try {
    const { data: blogs, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify(blogs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return new Response("Failed to fetch blog posts", { status: 500 });
  }
};
