import { supabase } from "@/lib/supabase";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Blog post not found", { status: 404 });
      }
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return new Response("Failed to fetch blog post", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const fieldsToUpdate = await request.json();

    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      return new Response("No fields provided", { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(fieldsToUpdate)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Blog post not found", { status: 404 });
      }
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return new Response("Failed to update blog post", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = await request.json();
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id || id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Blog post not found", { status: 404 });
      }
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Blog post deleted", deleted: data }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return new Response("Failed to delete blog post", { status: 500 });
  }
};
