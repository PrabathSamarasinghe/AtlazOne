import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try{
        const { data, error } = await supabase
            .from("testimonials")
            .select("*")
            .eq("id", params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return ApiResponse.notFound("Testimonial not found");
            }
            throw error;
        }

        return ApiResponse.success(data);
    } catch (error){
        console.error("Database error:", error);
        return ApiResponse.error("Failed to fetch testimonial");
    }
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
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
                return ApiResponse.notFound("Testimonial not found");
            }
            throw error;
        }

        return ApiResponse.success(data);
    } catch (error){
        console.error("Database error:", error);
        return ApiResponse.error("Failed to update testimonial");
    }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try{
        let body: { id?: string } = {};
        try {
            body = await request.json();
        } catch (e) {
            // Body might be empty or already read
        }
        
        const { data, error } = await supabase
            .from("testimonials")
            .delete()
            .eq("id", params.id || body.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return ApiResponse.notFound("Testimonial not found");
            }
            throw error;
        }

        return ApiResponse.success({message: "Testimonial deleted successfully"});
    } catch (error){
        console.error("Database error:", error);
        return ApiResponse.error("Failed to delete testimonial");
    }
}