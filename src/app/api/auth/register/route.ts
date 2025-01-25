import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { ApiError, handleApiError } from "@/utils/errorHandler";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const url = new URL(request.url);
    
    try {
       const { email, password } = await request.json();

       if (!email || !password) {
           return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
       }

       console.log(request.url)
       const { error } = await supabase.auth.signUp({ 
            email, 
            password, 
            options:{
                emailRedirectTo: `${url.origin}/api/auth/callback`,
            }
        });

       if (error) {
            throw new ApiError(error.message, error.status)
        }

       return NextResponse.json({ message: "User registered successfully, Please check your email for a verification link." }, { status: 201 });
   } catch (error) {
       return handleApiError(error)
   }

}