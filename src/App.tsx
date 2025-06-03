import AddQuiz from "./home/AddQuiz"
import AllQuiz from "./home/AllQuiz"

function App() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-pink-400/30 to-blue-400/30 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[40%] left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative">
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text mb-2 sm:mb-4">
            Quiz Master
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-2xl px-4">
            Create, manage, and take quizzes with our intuitive platform
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl dark:bg-gray-800/90 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                My Quizzes
              </h2>
              <AddQuiz />
            </div>
            <AllQuiz />
          </div>
        </div>
      </div>
    </div> 
  )
}

export default App
