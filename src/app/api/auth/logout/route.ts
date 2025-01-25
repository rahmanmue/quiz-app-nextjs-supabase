import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    const url = new URL(request.url)
    const supabase = await createClient();
    supabase.auth.signOut();
    return NextResponse.redirect(url.origin, {
        status: 301
    })
}