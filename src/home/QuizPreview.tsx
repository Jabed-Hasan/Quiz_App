import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { setQuiz, setUserAnswer, nextQuestion, previousQuestion, completeQuiz } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Quiz = {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
};

interface QuizPreviewProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizPreview({ quiz, isOpen, onClose }: QuizPreviewProps) {
  const dispatch = useAppDispatch();
  const [isStarted, setIsStarted] = useState(false);
  const { currentQuestionIndex, userAnswers, quizCompleted } = useAppSelector((state) => state.quiz);

  const handleStartQuiz = () => {
    dispatch(setQuiz(quiz.questions));
    setIsStarted(true);
  };

  const handleAnswer = (answer: string) => {
    dispatch(setUserAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleComplete = () => {
    dispatch(completeQuiz());
  };

  const handleClose = () => {
    setIsStarted(false);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const correctAnswersCount = quizCompleted ? quiz.questions.reduce((count, q, index) => {
    return userAnswers[index] === q.correctAnswer ? count + 1 : count;
  }, 0) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {quiz.title || quiz.name}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {quiz.description}
          </DialogDescription>
        </DialogHeader>

        {!isStarted ? (
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Questions:</span>
              <span className="font-medium">{quiz.questions.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Created:</span>
              <span className="font-medium">{formatDate(quiz.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
              <span className="font-medium">{formatDate(quiz.updatedAt)}</span>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleStartQuiz} className="bg-blue-600 hover:bg-blue-700">
                Start Quiz
              </Button>
            </div>
          </div>
        ) : quizCompleted ? (
          <div className="py-6 space-y-6">
            <h2 className="text-xl font-semibold text-center">Quiz Completed!</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {correctAnswersCount} / {quiz.questions.length}
              </p>
              <p className="text-gray-600 mt-2">Correct Answers</p>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(correctAnswersCount / quiz.questions.length) * 100}%` }}
              />
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <div className="py-4">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full justify-start text-left py-4 ${
                        currentAnswer === option
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleComplete}
                      disabled={!currentAnswer}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!currentAnswer}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 