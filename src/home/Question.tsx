import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  setUserAnswer } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import QuizControll from "./QuizControll";

export default function Question() {
  const dispatch = useAppDispatch();
  const { question, currentQuestionIndex, userAnswers } = useAppSelector(
    (state) => state.quiz
  );
  const currentQuestion = question[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  console.log(currentAnswer)
  const handleAnswer = (answer: string) => {
    dispatch(setUserAnswer({ questionIndex: currentQuestionIndex, answer }));
  };


  return (
    <div className="flex justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {question.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentQuestion.options.map((option, index) => (
            <Button
              onClick={() => handleAnswer(option)}
              key={index}
              size={"lg"}
              className="w-full mt-3"
              variant={currentAnswer === option ? "default" : "outline"}
            >
              {option}
            </Button>
          ))}
          <QuizControll />
        </CardContent>

       
      </Card>
    </div>
  );
}
