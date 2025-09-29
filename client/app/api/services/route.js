import { supabase } from "@/lib/supabase";
export const GET = async()=>{
    try{
        const { data: services, error } = await supabase.from("services").select("*");
        if (error) throw error;

        return new Response(JSON.stringify(services), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error){
        console.error("Error fetching services:", error);
        return new Response("Failed to fetch services", { status: 500 });   
    }
}
    