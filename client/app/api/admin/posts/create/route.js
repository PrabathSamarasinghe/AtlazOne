import { supabase } from "@/lib/supabase";

export const POST = async (request) => {
  try {
    const {
      title,
      excerpt,
      image,
      author,
      date,
      category,
      read_time,
      status,
      content,
    } = await request.json();

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title,
          excerpt,
          image,
          author,
          date,
          category,
          read_time,
          status,
          content,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return new Response("Failed to create blog post", { status: 500 });
  }
};
