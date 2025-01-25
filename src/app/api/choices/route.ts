import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function POST(request: NextRequest) {
    const supabase = await createClient();   
    try {
        const {question_id, choice_text, is_correct} = await request.json();

        const { error } = await supabase
            .from('choices')
            .insert([{ question_id, choice_text, is_correct}])
            
        if (error) {
            console.error("Choices Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Choices created successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// export async function GET(){
//     const supabase = await createClient(); 

//     try {
//         const { data, error } = await supabase
//             .from('questions')
//             .select('*')

//         if (error) {
//             console.error("Question Error:", error);
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         }

//         return NextResponse.json(data, {status:200})
          
//     } catch (error) {
//         console.error("Unexpected Error:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
    
// }