import { Button } from "@/components/ui/button";
import { completeQuiz, nextQuestion, previousQuestion } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";


export default function QuizControll() {


  const {currentQuestionIndex, question, userAnswers} = useAppSelector(state => state.quiz)
  const isAnswerSelected = userAnswers[currentQuestionIndex] !== null
  const dispatch = useAppDispatch()
    const handleNextQuestion = () => {
      dispatch(nextQuestion());
    }
    const handlePreviousQuestion = () => {
    dispatch(previousQuestion());
    }
    const handleCompleteQuiz = () => {
      dispatch(completeQuiz())
    }
    const isQuizCompleted = isAnswerSelected || currentQuestionIndex === question.length - 1
  return (
    <div className="flex justify-between mt-4 space-x-4">
      <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
     {currentQuestionIndex < question.length - 1 && <Button onClick={handleNextQuestion} disabled={!isAnswerSelected}>Next</Button>}
     {currentQuestionIndex === question.length - 1 && <Button onClick={handleCompleteQuiz} disabled={!isQuizCompleted}>Complete Quiz</Button>}
    </div>
  )
}
