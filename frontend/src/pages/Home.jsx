import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center bg-amber-100/40">
        <h1 className="mb-6 text-5xl font-extrabold text-amber-900 md:text-6xl">
          Discover History Like Never Before
        </h1>
        <p className="max-w-2xl mb-10 text-xl text-gray-700">
          Heritage Learning Hub is an interactive educational platform where students explore historical monuments, test their knowledge, and teachers build custom learning modules.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link 
            to="/explore" 
            className="px-8 py-3 font-bold text-white transition-colors rounded-lg bg-amber-700 hover:bg-amber-800"
          >
            Start Exploring
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 font-bold transition-colors bg-white border-2 rounded-lg text-amber-800 border-amber-700 hover:bg-amber-50"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl px-8 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
          Why Choose Heritage Learning Hub?
        </h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="p-6 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-2xl text-white rounded-full bg-amber-600">
              🏛️
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">Rich Content</h3>
            <p className="text-gray-600">
              Explore detailed modules covering iconic monuments, their architecture, and their historical significance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-2xl text-white rounded-full bg-amber-600">
              📝
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with built-in interactive quizzes at the end of each lesson to reinforce your learning.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-2xl text-white rounded-full bg-amber-600">
              👨‍🏫
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">Teacher Uploads</h3>
            <p className="text-gray-600">
              Educators have exclusive access to easily create and publish new heritage sites directly to the platform.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}