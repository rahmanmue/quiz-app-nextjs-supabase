import { NextResponse } from "next/server";
import { clearAuthCookies, createClient } from "@/utils/supabase/server";

export async function POST() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    clearAuthCookies();
    return NextResponse.json({redirect: "/sign-in"})
}