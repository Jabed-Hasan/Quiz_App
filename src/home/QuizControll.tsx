import { Button } from "@/components/ui/button";
import { nextQuestion, previousQuestion } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch } from "@/redux/hook";


export default function QuizControll() {
  const dispatch = useAppDispatch()
    const handleNextQuestion = () => {
      dispatch(nextQuestion());
    }
    const handlePreviousQuestion = () => {
    dispatch(previousQuestion());
    }
  return (
    <div className="flex justify-between mt-4 space-x-4">
      <Button onClick={handlePreviousQuestion}>Previous</Button>
      <Button onClick={handleNextQuestion}>Next</Button>
    </div>
  )
}
