import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async () =>{
    try{
        const { data: projects, error } = await supabase.from("projects").select("*");

        if (error) throw error;

        return ApiResponse.success(projects);
    } catch (error){
        console.error("Error fetching projects:", error);
        return ApiResponse.error("Failed to fetch projects");
    }
}
