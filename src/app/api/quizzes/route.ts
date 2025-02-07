import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


export async function GET(){
    const supabase = await createClient(); 

    try {
        const { data, error } = await supabase
            .from('quizzes')
            .select('*')

        if (error) {
            console.error("Quiz Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data, {status:200})
          
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();   
    try {
        const {title, userId, questions} = await request.json();
       
        const {data: quizData, error: quizError} = await supabase
            .from("quizzes")
            .insert([{title: title, userId:userId}])
            .select();

        if (quizError) {
            console.error("Quiz Insert Error:", quizError);
            return NextResponse.json({ error: quizError.message }, { status: 400 });
        }

        const quizId = quizData[0].id;

        for(const question of questions){
            const {question_text, choices} = question;

            const { data: questionData, error: questionError } = await supabase
                .from('questions')
                .insert([{ quiz_id: quizId, question_text: question_text}])
                .select();

            if (questionError) {
                console.error("Question Insert Error:", questionError);
                return NextResponse.json({ error: questionError.message }, { status: 400 });
            }

            const questionId = questionData[0].id;

            const formatted_choices = choices.map(({choice_text, is_correct}: {choice_text: string, is_correct: boolean}) => ({question_id : questionId, choice_text, is_correct}))
            
            const { error: choicesError } = await supabase
                .from("choices")
                .insert(formatted_choices);

            if (choicesError) {
                console.error("Choices Insert Error:", choicesError);
                return NextResponse.json({ error: choicesError.message }, { status: 400 });
            }

        }

        return NextResponse.json({ message: "Quiz created successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



//    const dataDummy = {
//         "title": "quiz A",
//         "questions" : [
//             {
//                 "question_text" : "5 x 5 = ",
//                 "choices" : [
//                     {"choice_text": "25", "is_correct" : true},
//                     {"choice_text": "28", "is_correct" : false},
//                     {"choice_text": "27", "is_correct" : false},
//                     {"choice_text": "20", "is_correct" : false}
//                 ],
//             },
//             {
//                 "question_text" : "5 + 5 = ",
//                 "choices" : [
//                     {"choice_text": "10", "is_correct" : true},
//                     {"choice_text": "28", "is_correct" : false},
//                     {"choice_text": "27", "is_correct" : false},
//                     {"choice_text": "20", "is_correct" : false}
//                 ],
//             },

//         ]
//     }
