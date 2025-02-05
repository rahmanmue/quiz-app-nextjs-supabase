import { handleApiError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function GET() {
    const supabase = await createClient();

    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          return NextResponse.json({ user: null, error: "Session not found" }, {status: 401});
        }
    
        return NextResponse.json({ user }, {status: 200}); 
    } catch (error) {
        console.error("Error fetching user:", error);
        return handleApiError(error);
    }
}