"use client"

import { useState } from "react";
import { Input } from "./ui/input"
import { Button } from "./ui/button";

interface Choice {
    choice_text: string;
    is_correct: boolean;
  }
  
interface Question {
    question_text: string;
    choices: Choice[];
}

export function AddQuizForm(){
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [questions, setQuestions] = useState<Question[]>([
      { question_text: "", choices: [{ choice_text: "", is_correct: false }, { choice_text: "", is_correct: false }] },
      { question_text: "", choices: [{ choice_text: "", is_correct: false }, { choice_text: "", is_correct: false }] }
    ]);

    // Tambah pertanyaan baru
    const addQuestion = () => {
        const lastQuestion = questions[questions.length - 1];
        
        if (!lastQuestion.question_text.trim()) {
          setError("Question cannot be empty!");
          return;
        }

        if (lastQuestion.choices.some(choice => !choice.choice_text.trim())) {
          setError("All choices must be filled before adding a new question!");
          return;
        }


        setQuestions([...questions, { question_text: "", choices: [{ choice_text: "", is_correct: false }, { choice_text: "", is_correct: false }] }]);
        setError("");

    };

    // Hapus pertanyaan berdasarkan index
    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    // Perbarui teks pertanyaan
    const handleQuestionChange = (index: number, text: string) => {
        const newQuestions = [...questions];
        newQuestions[index].question_text = text;
        setQuestions(newQuestions);
    };

    // Tambah pilihan jawaban ke pertanyaan tertentu
    const addChoice = (qIndex: number) => {
        if (questions[qIndex].choices.some(choice => !choice.choice_text.trim())) {
          setError("All choices must be filled before adding a new one!");
          return;
        }


        const newQuestions = [...questions];
        newQuestions[qIndex].choices.push({ choice_text: "", is_correct: false });
        setQuestions(newQuestions);
        setError("");
    };

    // Hapus pilihan jawaban dari pertanyaan tertentu
    const removeChoice = (qIndex: number, cIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices.splice(cIndex, 1);
        setQuestions(newQuestions);
    };

    // Perbarui teks pilihan jawaban
    const handleChoiceChange = (qIndex: number, cIndex: number, text: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices[cIndex].choice_text = text;
        setQuestions(newQuestions);
    };

    // Menandai pilihan yang benar
    const setCorrectAnswer = (qIndex: number, cIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices = newQuestions[qIndex].choices.map(
        (choice, idx) => ({
            ...choice,
            is_correct: idx === cIndex,
        }));
        setQuestions(newQuestions);
    };

    // Handle Submit
    const handleSubmit = () => {
        if (!title.trim()) {
          setError("Quiz title cannot be empty!");
          return;
        }

        for (const question of questions) {
          if (!question.question_text.trim()) {
            setError("All questions must be filled!");
            return;
          }
          if (question.choices.some(choice => !choice.choice_text.trim())) {
            setError("All choices must be filled!");
            return;
          }
          if (!question.choices.some(choice => choice.is_correct)) {
            setError("Each question must have at least one correct answer!");
            return;
          }
        }

        setError("");


        const quizData = { title,questions};
        console.log("Final Quiz Data:", quizData);
        alert("Data berhasil dikirim! Cek console.");
    };

    // return(
    //     <>
    //         <h1 className="text-center mt-6 mb-3 text-xl font-bold tracking-widest">Add Quiz</h1>
    //         <div className="flex justify-center items-center gap-2">
    //             <div className="w-3/4">
    //                 <Input placeholder="Add Title Quiz"/>
    //                 <div className="my-3 text-lg font-bold tracking-widest">
    //                     <h2>Question</h2>
    //                 </div>
                    
    //                 <div className="flex gap-5">
    //                     <div className="w">1.</div>
    //                     <div className="w-full">
    //                         <Input placeholder="Enter Question"/>
    //                             <Input className="ml-3 mt-3"/>
                            
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </> 
    // )

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white">
          <h1 className="text-center mt-6 mb-3 text-xl font-bold tracking-widest">
            Add Quiz
          </h1>

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
                <h2 className="text-lg font-bold tracking-widest">
                  Question {qIndex + 1}
                </h2>
                <Button
                  variant="destructive"
                  className="tracking-widest"
                  size="sm"
                  onClick={() => removeQuestion(qIndex)}
                >
                  Remove
                </Button>
              </div>
    
              <Input
                placeholder="Enter Question"
                value={question.question_text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="mb-3"
              />
    
              {/* Choices Section */}
              {question.choices.map((choice, cIndex) => (
                <div key={cIndex} className="flex items-center gap-3 mb-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={choice.is_correct}
                    onChange={() => setCorrectAnswer(qIndex, cIndex)}
                  />
                  <Input
                    placeholder={`Choice ${cIndex + 1}`}
                    value={choice.choice_text}
                    onChange={(e) =>
                      handleChoiceChange(qIndex, cIndex, e.target.value)
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeChoice(qIndex, cIndex)}
                  >
                    🗑️
                  </Button>
                </div>
              ))}
    
              {/* Add Choice Button */}
              <Button variant="secondary" className="tracking-widest" size="sm" onClick={() => addChoice(qIndex)}>
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
            Submit Quiz
          </Button>
        </div>
      );
}