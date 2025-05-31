import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";


export default function QuizSummary() {
 const {question,userAnswers} = useAppSelector((state) => state.quiz )
 const correctAnswersCount = question.reduce((count,qna,index) => {
  return (qna.correctAnswer === userAnswers[index] ? count + 1 : count)
 },0)
  return (
    <Card className="w-[400px] max-w-2xl mx-auto mt-8">
        <CardHeader>
            <CardTitle>Quiz Summary</CardTitle>
        </CardHeader>
        <CardContent>
            <h4>Your Score {correctAnswersCount} out of {question.length}</h4>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div className={`h-full bg-green-500 rounded-full`} style={{width: `${(correctAnswersCount / question.length) * 100}%`}}></div>
            </div>
        </CardContent>
    </Card>
  )
}
