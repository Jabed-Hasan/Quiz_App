import { quizData } from '@/home/quizData'
import { createSlice } from '@reduxjs/toolkit'

interface TQuize {
  question : typeof quizData,
  currentQuestionIndex : number,
  userAnswers : (string | null)[],
  quizCompleted : boolean,
}

 const initialState: TQuize = {
   question : quizData,
   currentQuestionIndex : 0,
   userAnswers : Array(quizData.length).fill(null),
   quizCompleted : false,
   
 }

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUserAnswer: (state, action) => {
      const {questionIndex, answer} = action.payload
      state.userAnswers[questionIndex] = answer
    },
    nextQuestion: (state) => {
      if(state.currentQuestionIndex < state.question.length - 1){
        state.currentQuestionIndex++
      }
  },
  previousQuestion: (state) => {
    if(state.currentQuestionIndex > 0){
      state.currentQuestionIndex--
    }
  },
  
  completeQuiz: (state) => {
    state.quizCompleted = true
  },
  

}
})

export const {setUserAnswer, nextQuestion, previousQuestion, completeQuiz} = quizSlice.actions
export default quizSlice.reducer
