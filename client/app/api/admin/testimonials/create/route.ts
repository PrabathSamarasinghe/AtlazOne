import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const POST = async (request: Request) => {
    try {
        const { name, role, image, content, rating } = await request.json();
        
        if (!name || !role || !content || !rating) {
            return ApiResponse.error("Name, role, content, and rating are required", 400);
        }

        if (rating < 1 || rating > 5) {
            return ApiResponse.error("Rating must be between 1 and 5", 400);
        }
        
        const { data, error } = await supabase
            .from("testimonials")
            .insert([{
                name, 
                role, 
                image: image || '', 
                content, 
                rating
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }
        
        return ApiResponse.success(data, 201);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return ApiResponse.error("Failed to create testimonial");
    }
}