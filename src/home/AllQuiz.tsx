import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDeleteQuizApiMutation, useGetQuizQuery } from "@/redux/api/quizAPi"

import UpdateQuiz from "./UpdateQuiz"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useState } from "react"
import QuizPreview from "./QuizPreview"

type QuizQuestion = {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

type Quiz = {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
}

export default function AllQuiz() {
  
  const {data, isLoading} = useGetQuizQuery(undefined)   
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizApiMutation()
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  
  if(isLoading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  )

  const handleDelete = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteQuiz(id).unwrap()
      toast.success("Quiz deleted successfully!", {
        description: `"${name}" has been deleted.`,
        duration: 3000
      })
    } catch (error) {
      toast.error("Failed to delete quiz", {
        description: "Please try again later.",
        duration: 3000
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }

  const handleCardClick = (quiz: Quiz, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('.action-buttons')) {
      return;
    }
    setSelectedQuiz(quiz);
  };
 
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data?.map((quiz: Quiz) => (
          <Card 
            key={quiz._id} 
            className="group transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border cursor-pointer
              bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 
              hover:from-purple-600/20 hover:via-pink-600/20 hover:to-blue-600/20
              dark:from-purple-600/20 dark:via-pink-600/20 dark:to-blue-600/20
              dark:hover:from-purple-600/30 dark:hover:via-pink-600/30 dark:hover:to-blue-600/30
              border-purple-200/50 dark:border-purple-800/50
              hover:shadow-lg hover:shadow-purple-500/10"
            onClick={(e) => handleCardClick(quiz, e)}
          >
            <CardHeader className="relative space-y-2 pb-4 border-b border-purple-200/30 dark:border-purple-800/30">
              <div 
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 flex gap-1 p-2 action-buttons"
                onClick={(e) => e.stopPropagation()}
              >
                <UpdateQuiz 
                  quizId={quiz._id}
                  initialData={{
                    title: quiz.title || quiz.name || "",
                    description: quiz.description || "",
                    questions: quiz.questions?.map((q: QuizQuestion) => ({
                      question: q.question,
                      options: q.options,
                      correctAnswer: q.correctAnswer
                    })) || []
                  }}
                  trigger={
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                    </Button>
                  }
                />
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Quiz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{quiz.title || quiz.name}" and all its questions.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => handleDelete(quiz._id, (quiz.title || quiz.name || "Untitled Quiz"), e)}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete Quiz"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {quiz.title || quiz.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                Created {formatDate(quiz.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {quiz.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-2-2-1.5 0-2 .62-2 2s.5 2 2 2z"></path>
                    <path d="M15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-.5-2-2-2-1.5 0-2 .62-2 2s.5 2 2 2z"></path>
                  </svg>
                  <span>{quiz.questions.length} Questions</span>
                </div>
                <span>Updated {formatDate(quiz.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedQuiz && (
        <QuizPreview
          quiz={selectedQuiz}
          isOpen={!!selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
        />
      )}
    </>
  )
}
