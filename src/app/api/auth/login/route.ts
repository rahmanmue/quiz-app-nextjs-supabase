import { ApiError, handleApiError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    try {
        const {email, password} = await request.json();
       
 
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
 
        const {error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            console.log(error)
            throw new ApiError(error.message, error.status)
        }

        return NextResponse.json({message: "Login Successfully"}, {status: 200})
     } catch (error) {
        return handleApiError(error)
     }
 
}