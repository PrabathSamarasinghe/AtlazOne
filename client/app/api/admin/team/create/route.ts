import { supabase } from "@/lib/supabase";

export const POST = async (request: Request) => {
    try {
        const { name, role, image, bio, social } = await request.json();
        
        if (!name || !role || !bio) {
            return new Response("Name, role, and bio are required", { status: 400 });
        }
        
        const insertData = {
            name, 
            role, 
            image: image || '', 
            bio, 
            linkedin: social?.linkedin || '', 
            twitter: social?.twitter || '', 
            github: social?.github || ''
        };

        const { data, error } = await supabase
            .from("team")
            .insert([insertData])
            .select()
            .single();
        
        if (error) {
            throw error;
        }

        const newMember = {
            id: data.id,
            name: data.name,
            role: data.role,
            image: data.image,
            bio: data.bio,
            social: {
                linkedin: data.linkedin,
                twitter: data.twitter,
                github: data.github
            }
        };
        
        return new Response(JSON.stringify(newMember), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating team member:", error);
        return new Response("Failed to create team member", { status: 500 });
    }
}