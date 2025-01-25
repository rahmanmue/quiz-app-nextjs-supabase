import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    const supabase = await createClient();

    try {
        const {data, error} = await supabase
            .from("quizzes")
            .select(`
                id,
                title,
                questions (
                    id,
                    question_text,
                    choices(
                        id,
                        choice_text,
                        is_correct
                    )
                )`
            )
            .eq('id', params.id);

        if(error){
            console.error("Quiz Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data[0], {status:200})


    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}