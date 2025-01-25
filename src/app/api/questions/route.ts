import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function POST(request: NextRequest) {
    const supabase = await createClient();   
    try {
        const {quiz_id, question_text} = await request.json();

        const { error } = await supabase
            .from('questions')
            .insert([{ quiz_id: quiz_id, question_text: question_text}])
            
        if (error) {
            console.error("Question Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Question created successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
