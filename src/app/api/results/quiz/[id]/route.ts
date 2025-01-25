import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function  GET(request: NextRequest, {params}: {params : {id: string}}) {
    const supabase = await createClient();
    try {
        const {data, error} = await supabase
            .from("results")
            .select("*")
            .eq("quiz_id", params.id)
            .order("score", { ascending: false });;

        if (error) {
            console.error("Results Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data, {status:200})    
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
