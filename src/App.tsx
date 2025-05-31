import Question from "./home/Question"
import QuizSummary from "./home/QuizSummary"
import { useAppSelector } from "./redux/hook"


function App() {
  const {quizCompleted} = useAppSelector(state => state.quiz)
  return (
    <div>
        <h1 className="text-8xl m-5 text-center">Quiz App</h1>
        {quizCompleted ? <QuizSummary /> : <Question />}
    </div>
  )
}

export default App
