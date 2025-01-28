import { ApiError, handleApiError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    try {
        const {password} = await request.json();
       

        const {error} = await supabase.auth.updateUser({
            password: password
        })

        if(error){
            return new ApiError(error.message, error.status)
        }

        return NextResponse.json({redirect: '/sign-in'})
        
    } catch (error) {
        return handleApiError(error);
    }
}