import { supabase } from "@/lib/supabase";

export const POST = async (request: Request) =>{
    try{
        const {title, category, image, tech, link, github, status, client, start_date, end_date, challenge, solution, impact, industry} = await request.json();
        
        // Debug logging
        console.log("Received data:", {title, category, image, tech, link, github, status, client, start_date, end_date, challenge, solution, impact, industry});
        console.log("Tech type:", typeof tech, "Tech value:", tech);
        
        // Handle empty date strings by converting them to null
        const processedStartDate = start_date === '' ? null : start_date;
        const processedEndDate = end_date === '' ? null : end_date;
        
        if (!title || !category){
            return new Response(
                JSON.stringify({ message: "Title and category are required" }),
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("projects")
            .insert([{
                title, 
                category, 
                image, 
                tech, 
                link, 
                github, 
                status, 
                client, 
                start_date: processedStartDate, 
                end_date: processedEndDate,
                challenge,
                solution,
                impact,
                industry
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error){
        console.error("Error creating project", error)
        return new Response("Failed to create project", { status: 500 });
    }
}