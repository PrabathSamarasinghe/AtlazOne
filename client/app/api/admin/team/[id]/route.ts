import { supabase } from "@/lib/supabase";

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        
        console.log("Deleting team member with ID:", id);
        

        if (!id) {
            return new Response("Team member ID is required", { status: 400 });
        }
        
        const { error } = await supabase
            .from("team")
            .delete()
            .eq("id", id)
            .select()
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Team member not found", { status: 404 });
            }
            throw error;
        }
        
        return new Response(JSON.stringify({ success: true, id }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return new Response("Failed to delete team member", { status: 500 });
    }
}


export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const { name, role, image, bio, social } = await request.json();

        if (!id || !name || !role || !bio) {
            return new Response("ID, name, role, and bio are required", { status: 400 });
        }
        
        const updateData = {
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
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Team member not found", { status: 404 });
            }
            throw error;
        }
        
        const updatedMember = {
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
        
        return new Response(JSON.stringify(updatedMember), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error updating team member:", error);
        return new Response("Failed to update team member", { status: 500 });
    }
}