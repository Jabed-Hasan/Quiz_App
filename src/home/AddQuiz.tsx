import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner"
import { useAddQuizApiMutation } from "@/redux/api/quizAPi";

type QuizData = {
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

export default function AddQuiz() {
  const [addQuiz, { isLoading }] = useAddQuizApiMutation(); 
  const [step, setStep] = useState(1);
  const [addQuestionStep, setAddQuestionStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    optionIndex?: number
  ) => {
    const { value } = e.target;
    if (field === "title" || field === "description") {
      setQuizData((prev) => ({ ...prev, [field]: value }));
    } else if (field === "question") {
      setNewQuestion((prev) => ({ ...prev, question: value }));
    } else if (field === "option" && optionIndex !== undefined) {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[optionIndex] = value;
      setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    }
  };

  const handleCorrectAnswerSelect = (answer: string) => {
    setNewQuestion((prev) => ({ ...prev, correctAnswer: answer }));
  };

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setOpenAddQuestionModal(false);
    setAddQuestionStep(1);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!quizData.title.trim()) {
        throw new Error("Title is required");
      }

      if (quizData.questions.length === 0) {
        throw new Error("At least one question is required");
      }

      // Clean and validate questions
      const cleanedQuestions = quizData.questions.map(q => ({
        question: q.question.trim(),
        options: q.options.filter(opt => opt.trim() !== ""),
        correctAnswer: q.correctAnswer.trim()
      }));

      // Validate each question
      cleanedQuestions.forEach((q, index) => {
        if (!q.question) {
          throw new Error(`Question ${index + 1} text is required`);
        }
        if (q.options.length < 2) {
          throw new Error(`Question ${index + 1} must have at least 2 options`);
        }
        if (!q.correctAnswer) {
          throw new Error(`Question ${index + 1} must have a correct answer`);
        }
        if (!q.options.includes(q.correctAnswer)) {
          throw new Error(`Question ${index + 1}'s correct answer must be one of the options`);
        }
      });

      // Prepare the final payload
      const payload = {
        title: quizData.title.trim(),
        description: quizData.description.trim(),
        questions: cleanedQuestions
      };

      console.log('Submitting quiz with payload:', JSON.stringify(payload, null, 2));

      const response = await addQuiz(payload).unwrap();
      console.log('Server response:', response);
      
      toast.success("Quiz added successfully!", {
        description: `"${payload.title}" has been created.`
      });
      setIsDialogOpen(false);
      // Reset form
      setQuizData({
        title: "",
        description: "",
        questions: []
      });
      setStep(1);
    } catch (error: any) {
      console.error('Error submitting quiz:', error);
      toast.error("Failed to add quiz", {
        description: error.message || "Please check your input and try again."
      });
    }
  };

  return (
    <div className="my-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Create Quiz
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              {step === 1 && "Step 1: Enter Quiz Details"}
              {step === 2 && "Step 2: Add Questions"}
              {step === 3 && "Step 3: Review and Submit"}
            </DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={quizData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="col-span-3"
                  placeholder="Enter quiz title"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={quizData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className="col-span-3"
                  placeholder="Enter quiz description"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 py-4">
              {quizData.questions.map((q, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <Label className="text-right">
                    Q{index + 1}: {q.question}
                  </Label>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => setOpenAddQuestionModal(true)}
                className="mt-4 w-full"
              >
                Add Question
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="py-4">
              <h3 className="font-medium mb-2">Quiz Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Title:</span> {quizData.title}</p>
                <p><span className="font-medium">Description:</span> {quizData.description}</p>
                <p><span className="font-medium">Total Questions:</span> {quizData.questions.length}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            {step > 1 && (
              <Button disabled={isLoading} variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button 
                onClick={nextStep}
                disabled={step === 1 && (!quizData.title || !quizData.description) || 
                         step === 2 && quizData.questions.length === 0}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button 
                disabled={isLoading} 
                onClick={handleSubmit} 
                className="bg-green-500 hover:bg-green-600"
              >
                {isLoading ? "Adding Quiz..." : "Submit Quiz"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openAddQuestionModal}
        onOpenChange={setOpenAddQuestionModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Step {addQuestionStep}:{" "}
              {addQuestionStep === 1 ? "Question" : addQuestionStep === 2 ? "Options" : "Correct Answer"}
            </DialogDescription>
          </DialogHeader>

          {addQuestionStep === 1 && (
            <Input
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) => handleInputChange(e, "question")}
              required
            />
          )}
          {addQuestionStep === 2 &&
            newQuestion.options.map((option, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={option}
                onChange={(e) => handleInputChange(e, "option", i)}
                required
              />
            ))}
          {addQuestionStep === 3 && (
            <div>
              <Label>Correct Answer</Label>
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) => handleCorrectAnswerSelect(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
                required
              >
                <option value="">Select correct answer</option>
                {newQuestion.options.map((option, i) => (
                  option && (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  )
                ))}
              </select>
            </div>
          )}

          <DialogFooter>
            {addQuestionStep > 1 && (
              <Button onClick={() => setAddQuestionStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {addQuestionStep < 3 ? (
              <Button 
                onClick={() => setAddQuestionStep((s) => s + 1)}
                disabled={addQuestionStep === 1 && !newQuestion.question ||
                         addQuestionStep === 2 && newQuestion.options.some(opt => !opt)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={addQuestion}
                disabled={!newQuestion.question || !newQuestion.correctAnswer || newQuestion.options.some(opt => !opt)}
              >
                Add Question
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}