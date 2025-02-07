// export default function EditQuizForm(){
//     const dataDummy = [{
//         id: 1,
//         title: "quiz A",
//         questions : [
//             {
//                 id: 1,
//                 question_text : "5 x 5 = ",
//                 choices : [
//                     {id: 1, choice_text: 25, is_correct : true},
//                     {id: 2, choice_text: 28, is_correct : false},
//                     {id: 3, choice_text: 27, is_correct : false},
//                     {id: 4, choice_text: 20, is_correct : false}
//                 ],
//             },
//             {
//                 id: 2,
//                 question_text : "7 x 5 = ",
//                 choices : [
//                     {id: 1, choice_text: 25, is_correct : true},
//                     {id: 2, choice_text: 28, is_correct : false},
//                     {id: 3, choice_text: 37, is_correct : false},
//                     {id: 4, choice_text: 35, is_correct : false}
//                 ],
//             },

//         ]
//     }]


// }

"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { createClient } from "@supabase/supabase-js";


interface Choice {
  id?: number;
  choice_text: string;
  is_correct: boolean;
}

interface Question {
  id?: number;
  question_text: string;
  choices: Choice[];
}

export function EditQuizForm({ quizId }: { quizId: number }) {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch quiz data by ID
  useEffect(() => {
    const fetchQuiz = async () => {
    //   const { data, error } = await supabase
    //     .from("quizzes")
    //     .select("id, title, questions(id, question_text, choices(id, choice_text, is_correct))")
    //     .eq("id", quizId)
    //     .single();

    //   if (error) {
    //     console.error("Error fetching quiz:", error);
    //     return;
    //   }

        const data = {
            id: 1,
            title: "quiz A",
            questions : [
                {
                    id: 1,
                    question_text : "5 x 5 = ",
                    choices : [
                        {id: 1, choice_text: "25", is_correct : true},
                        {id: 2, choice_text: "28", is_correct : false},
                        {id: 3, choice_text: "27", is_correct : false},
                        {id: 4, choice_text: "20", is_correct : false}
                    ],
                },
                {
                    id: 2,
                    question_text : "7 x 5 = ",
                    choices : [
                        {id: 1, choice_text: "25", is_correct : true},
                        {id: 2, choice_text: "28", is_correct : false},
                        {id: 3, choice_text: "37", is_correct : false},
                        {id: 4, choice_text: "35", is_correct : false}
                    ],
                },

            ]
        }

      setTitle(data.title);
      setQuestions(data.questions || []);
    };

    fetchQuiz();
  }, [quizId]);

  // Tambah Pertanyaan Baru
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: undefined, question_text: "", choices: [{ choice_text: "", is_correct: false }] },
    ]);
  };

  // Tambah Pilihan Jawaban Baru
  const addChoice = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choices.push({ choice_text: "", is_correct: false });
    setQuestions(newQuestions);
  };

  // Hapus Pertanyaan
  const removeQuestion = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  // Hapus Pilihan Jawaban
  const removeChoice = (qIndex: number, cIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choices.splice(cIndex, 1);
    setQuestions(newQuestions);
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Quiz title cannot be empty!");
      return;
    }

    // update title
    // const { data, error } = await supabase
    //   .from("quizzes")
    //   .update({ title })
    //   .eq("id", quizId);

    // if (error) {
    //   console.error("Error updating quiz title:", error);
    //   return;
    // }

    // Loop untuk update / insert / delete questions & choices
    for (const question of questions) {
      if (!question.question_text.trim()) {
        setError("All questions must be filled!");
        return;
      }

      // Update / Insert Question
    //   let questionId = question.id;
    //   if (!question.id) {
    //     const { data, error } = await supabase
    //       .from("questions")
    //       .insert({ quiz_id: quizId, question_text: question.question_text })
    //       .select("id")
    //       .single();
    //     if (error) {
    //       console.error("Error adding question:", error);
    //       return;
    //     }
    //     questionId = data.id;
    //   } else {
    //     await supabase
    //       .from("questions")
    //       .update({ question_text: question.question_text })
    //       .eq("id", question.id);
    //   }

    //   // Loop untuk update / insert / delete choices
    //   for (const choice of question.choices) {
    //     if (!choice.choice_text.trim()) {
    //       setError("All choices must be filled!");
    //       return;
    //     }

    //     if (!choice.id) {
    //       await supabase
    //         .from("choices")
    //         .insert({ question_id: questionId, choice_text: choice.choice_text, is_correct: choice.is_correct });
    //     } else {
    //       await supabase
    //         .from("choices")
    //         .update({ choice_text: choice.choice_text, is_correct: choice.is_correct })
    //         .eq("id", choice.id);
    //     }
    //   }
    }

    setError("");
    console.log("Quiz updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-center mt-6 mb-3 text-xl font-bold tracking-widest">
        Edit Quiz
      </h1>

      {/* Display Error */}
      {error && <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>}

      {/* Input Title */}
      <Input
        placeholder="Enter Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />

      {/* Questions Section */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold tracking-widest">Question {qIndex + 1}</h2>
            <Button variant="destructive" size="sm" onClick={() => removeQuestion(qIndex)}>
              Remove
            </Button>
          </div>

          <Input
            placeholder="Enter Question"
            value={question.question_text}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[qIndex].question_text = e.target.value;
              setQuestions(newQuestions);
            }}
            className="mb-3"
          />

          {/* Choices Section */}
          {question.choices.map((choice, cIndex) => (
            <div key={cIndex} className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={choice.is_correct}
                onChange={() => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].choices = newQuestions[qIndex].choices.map(
                    (c, idx) => ({ ...c, is_correct: idx === cIndex })
                  );
                  setQuestions(newQuestions);
                }}
              />
              <Input
                placeholder={`Choice ${cIndex + 1}`}
                value={choice.choice_text}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].choices[cIndex].choice_text = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
              <Button variant="destructive" size="sm" onClick={() => removeChoice(qIndex, cIndex)}>
                X
              </Button>
            </div>
          ))}

          {/* Add Choice Button */}
          <Button variant="secondary" size="sm" onClick={() => addChoice(qIndex)}>
            + Add Choice
          </Button>
        </div>
      ))}

      {/* Add Question Button */}
      <Button onClick={addQuestion} className="w-full mb-4">
        + Add Question
      </Button>

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
        Save Changes
      </Button>
    </div>
  );
}
