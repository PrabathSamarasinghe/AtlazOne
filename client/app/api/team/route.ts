import { supabase } from "@/lib/supabase";
import { ApiResponse } from "@/lib/cache-utils";

export const GET = async () => {
    try {
        const { data: team, error } = await supabase.from("team").select("*").order("id", { ascending: true });

        if (error) throw error;
        const modifiedRows = team.map(row => ({
            ...row,
            social: {
                linkedin: row.linkedin,
                twitter: row.twitter,
                github: row.github
            }
        }));
        return ApiResponse.success(modifiedRows);
    } catch (error) {
        console.error("Error fetching team members:", error);
        return ApiResponse.error("Failed to fetch team members");
    }
};
