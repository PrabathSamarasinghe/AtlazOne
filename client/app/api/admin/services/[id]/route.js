
import { supabase } from "@/lib/supabase";

export const GET = async (request, { params }) => {
    try{
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("id", params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Service not found", {status: 404});
            }
            throw error;
        }

        return new Response(JSON.stringify(data),{
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error){
        console.error("Database error:", error);
        return new Response("Failed to fetch service", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    try {
        const fieldsToUpdate = await request.json();

        const keys = Object.keys(fieldsToUpdate);
        if (keys.length === 0) {
            return new Response("No fields provided to UPDATE", { status: 400 });
        }

        const { data, error } = await supabase
            .from("services")
            .update(fieldsToUpdate)
            .eq("id", params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Service not found", { status: 404 });
            }
            throw error;
        }

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        console.error("Database error:", error);
        return new Response("Failed to update service", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        const { data, error } = await supabase
            .from("services")
            .delete()
            .eq("id", params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return new Response("Service not found", { status: 404 });
            }
            throw error;
        }

        return new Response(JSON.stringify({ message: "Service deleted successfully" }), {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        console.error("Database error:", error);
        return new Response("Failed to delete service", { status: 500 });
    }
}