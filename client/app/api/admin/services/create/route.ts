import { supabase } from "@/lib/supabase";

export const POST = async (request: Request)=>{
    try{
        const {icon, title, description, color, price, features, isactive} = await request.json();

        if (!icon || !title || !description || !color || !price || !features || isactive === undefined){
            return new Response("Missing required fields", {status: 400});
        }

        const { data, error } = await supabase
            .from("services")
            .insert([{
                icon, 
                title, 
                description, 
                color, 
                price, 
                features, 
                isactive
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify(data),{
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error){
        console.error("Database error:", error);
        return new Response("Failed to create service", { status: 500 });
    }
}