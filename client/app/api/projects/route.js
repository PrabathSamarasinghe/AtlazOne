import { supabase } from "@/lib/supabase";

export const GET = async () =>{
    try{
        const { data: projects, error } = await supabase.from("projects").select("*");

        if (error) throw error;

        return new Response(JSON.stringify(projects), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error){
        console.error("Error fetching projects:", error);
        return new Response("Failed to fetch projects", { status: 500 });
    }
}
