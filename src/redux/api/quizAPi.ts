import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api'
  }),
  tagTypes: ['Quiz'],
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: () => '/quizzes',
      providesTags: ['Quiz']
    }),
    addQuizApi: builder.mutation({
      query: (body) => ({
        url: '/quizzes',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Quiz']
    }),
    updateQuizApi: builder.mutation({
      query: ({ id, body }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          title: body.name,
          description: body.description,
          questions: body.questions
        }
      }),
      invalidatesTags: ['Quiz']
    }),
    deleteQuizApi: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Quiz']
    })
  })
})

export const { 
  useGetQuizQuery, 
  useAddQuizApiMutation, 
  useUpdateQuizApiMutation,
  useDeleteQuizApiMutation 
} = quizApi