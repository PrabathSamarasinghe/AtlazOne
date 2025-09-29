import { supabase } from "@/lib/supabase";

export const POST = async (request) => {
    try {
        const { name, role, image, content, rating } = await request.json();
        
        if (!name || !role || !content || !rating) {
            return new Response("Name, role, content, and rating are required", { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return new Response("Rating must be between 1 and 5", { status: 400 });
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
        
        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return new Response("Failed to create testimonial", { status: 500 });
    }
}