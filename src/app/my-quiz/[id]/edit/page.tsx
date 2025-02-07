import { EditQuizForm } from "@/components/edit-quiz-form";

export default function EditQuiz(){
    const quizId = 3;
    return(
        <EditQuizForm quizId={quizId}/>
    )
}