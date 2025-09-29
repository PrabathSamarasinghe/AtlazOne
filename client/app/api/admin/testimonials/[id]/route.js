import { supabase } from "@/lib/supabase";

export const GET = async (request, { params }) => {
    try{
        const { data, error } = await supabase
            .from("testimonials")
            .select("*")
            .eq("id", params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Testimonial not found", { status: 404 });
            }
            throw error;
        }

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error){
        console.error("Database error:", error);
        return new Response("Failed to fetch testimonial", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    try{
        const fieldsToUpdate = await request.json();

        const { data, error } = await supabase
            .from("testimonials")
            .update(fieldsToUpdate)
            .eq("id", params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Testimonial not found", { status: 404 });
            }
            throw error;
        }

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error){
        console.error("Database error:", error);
        return new Response("Failed to update testimonial", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const body = await request.json();
    try{
        const { data, error } = await supabase
            .from("testimonials")
            .delete()
            .eq("id", params.id || body.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Testimonial not found", { status: 404 });
            }
            throw error;
        }

        return new Response(JSON.stringify({message: "Testimonial deleted successfully"}), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error){
        console.error("Database error:", error);
        return new Response("Failed to delete testimonial", { status: 500 });
    }
}