import { handleApiError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    try {
        const {email} = await request.json();

        await supabase.auth.resetPasswordForEmail(email,{
            redirectTo: 'http://localhost:3000/account/reset-password'
        })
       
        return NextResponse.json({ message: "Please check your email for reset password." }, { status: 200 });
        
    } catch (error) {
          return handleApiError(error)
    }
}