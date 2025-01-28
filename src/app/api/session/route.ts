import { handleApiError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function GET() {
    const supabase = await createClient();

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          return NextResponse.json({ session: null, error: "Session not found" }, {status: 401});
        }
    
        return NextResponse.json({ session }, {status: 200}); 
    } catch (error) {
        console.error("Error fetching session:", error);
        return handleApiError(error);
    }
}