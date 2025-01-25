import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();   
    try {
        const {quizId, userId, answers} = await request.json();
       
        const {data: questions, error: questionError} = await supabase
            .from("questions")
            .select(`id, choices(id, is_correct)`)
            .eq("quiz_id", quizId);

        if (questionError) {
            console.error("Question Error:", questionError);
            return NextResponse.json({ error: questionError.message }, { status: 400 });
        }

        let score = 0;

        for(const answer of answers){
           const question = questions.find((q) => q.id === answer.question_id)

          if(question){
            const chosenChoice = question.choices.find((choice) => choice.id === answer.chosen_choice_id)

            if(chosenChoice && chosenChoice.is_correct){
                score++;
            }
          }
        }

        const final_score = (score / questions.length) * 100;

        const { data: existingResult, error: existingResultError } = await supabase
            .from("results")
            .select("id")
            .eq("user_id", userId)
            .eq("quiz_id", quizId)
            .single();
        
        if(existingResultError){
            console.error("Error:", questionError);
            return NextResponse.json({ error: existingResultError.message }, { status: 400 });
        }

        if(existingResult){
            const {error} = await supabase
                .from("results")
                .update({score:final_score})
                .eq('user_id', userId)
                .eq('quiz_id', quizId)
            
            if (error) {
                console.error("Update results Error:", error);
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
        }else{
            const {error} = await supabase
            .from("results")
            .insert([{score:final_score, user_id: userId, quiz_id : quizId }])
           
            if (error) {
                console.error("Insert results Error:", error);
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
        }

    
        return NextResponse.json({ 
            final_score: final_score, 
            correct_answer : score, 
            total_questions : questions.length 
        }, { status: 201 });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


