import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setUserAnswer } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import QuizControll from "./QuizControll";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function Question() {
  const dispatch = useAppDispatch();
  const { question, currentQuestionIndex, userAnswers } = useAppSelector(
    (state) => state.quiz
  );
  const currentQuestion = question[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  
  const handleAnswer = (answer: string) => {
    dispatch(setUserAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  const progress = ((currentQuestionIndex + 1) / question.length) * 100;

  return (
    <div>
      {question.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center px-2 sm:px-0"
        >
          <div className="w-full max-w-2xl mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Card className="w-full max-w-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl">
            <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                {currentQuestion.question}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Question {currentQuestionIndex + 1} of {question.length}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="grid gap-2 sm:gap-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleAnswer(option)}
                      size="lg"
                      className={`w-full text-left justify-start py-4 sm:py-6 text-base sm:text-lg transition-all ${
                        currentAnswer === option
                          ? "bg-blue-600 hover:bg-blue-700 transform scale-102"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      variant={currentAnswer === option ? "default" : "outline"}
                    >
                      <span className="mr-3 sm:mr-4">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6">
                <QuizControll />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
