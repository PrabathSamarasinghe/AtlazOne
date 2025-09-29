import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const POST = async () => {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Supabase logout error:", error);
    }

    // Clear the auth token cookie
    cookies().set({
      name: "auth-token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    
    return new Response(JSON.stringify({ message: "Logged out successfully" }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ error: "Failed to log out" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

// Keep GET for backward compatibility
export const GET = async () => {
  return POST();
};
