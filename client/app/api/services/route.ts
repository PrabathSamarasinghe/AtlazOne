import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async()=>{
    try{
        const { data: services, error } = await supabase.from("services").select("*");
        if (error) throw error;

        return ApiResponse.success(services);
    } catch (error){
        console.error("Error fetching services:", error);
        return ApiResponse.error("Failed to fetch services");   
    }
}
    