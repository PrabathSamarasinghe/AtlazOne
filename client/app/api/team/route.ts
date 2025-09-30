import { supabase } from "@/lib/supabase";

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
        return new Response(JSON.stringify(modifiedRows), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        console.error("Error fetching team members:", error);
        return new Response("Failed to fetch team members", { status: 500 });
    }
};
