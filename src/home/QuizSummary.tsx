import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";


export default function QuizSummary() {
 const {question,userAnswers} = useAppSelector((state) => state.quiz )
 const correctAnswersCount = question.reduce((count,qna,index) => {
  return (qna.correctAnswer === userAnswers[index] ? count + 1 : count)
 },0)
  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto mt-4 sm:mt-8">
        <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Quiz Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <h4 className="text-base sm:text-lg mb-3">Your Score {correctAnswersCount} out of {question.length}</h4>
            <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                style={{width: `${(correctAnswersCount / question.length) * 100}%`}}
              ></div>
            </div>
        </CardContent>
    </Card>
  )
}
