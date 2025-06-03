import { quizData } from '@/home/quizData'
import { createSlice } from '@reduxjs/toolkit'

export type TQuiz = {
  _id : string,
  name : string,
  description : string,
  questions : TQuizData,
  createdAt : string,
  updatedAt : string,
  
}

export  interface TQuizData {
  question : typeof quizData,
  currentQuestionIndex : number,
  userAnswers : (string | null)[],
  quizCompleted : boolean,
}

 const initialState: TQuizData = {
   question : [],
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
  setQuiz: (state, action) => {
    state.question = action.payload
  },
  
  

}
})

export const {setUserAnswer, nextQuestion, previousQuestion, completeQuiz, setQuiz} = quizSlice.actions
export default quizSlice.reducer
