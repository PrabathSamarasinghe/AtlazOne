import { supabase } from "@/lib/supabase";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Project not found", { status: 404 });
      }
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Failed to fetch project", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const fieldsToUpdate = await request.json();
    
    // Handle empty date strings by converting them to null
    const processedFields = { ...fieldsToUpdate };
    if (processedFields.start_date === '') {
      processedFields.start_date = null;
    }
    if (processedFields.end_date === '') {
      processedFields.end_date = null;
    }
    
    const keys = Object.keys(processedFields);
    if (keys.length === 0) {
      return new Response("No fields provided to UPDATE", { status: 400 });
    }

    const { data, error } = await supabase
      .from("projects")
      .update(processedFields)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Project not found", { status: 404 });
      }
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Failed to update project", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return new Response("Project not found", { status: 404 });
      }
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Project deleted successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Failed to delete project", { status: 500 });
  }
};
