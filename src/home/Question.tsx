import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setUserAnswer } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export default function Question() {
  const dispatch = useAppDispatch()
  const { question, currentQuestionIndex } = useAppSelector(
    (state) => state.quiz
  );
  const currentQuestion = question[currentQuestionIndex];
  const handleAnswer = (answer: string) => {
    dispatch(setUserAnswer({questionIndex: currentQuestionIndex, answer}))
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
            <Button onClick={() => handleAnswer(option)} key={index} size={"lg"} className="w-full mt-3">
              {option}
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">xyz</CardFooter>
      </Card>
    </div>
  );
}
