import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-purple-50 dark:from-gray-800 dark:via-transparent dark:to-gray-900 pointer-events-none"></div>

      {/* Floating accent shapes */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-300 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -right-32 w-72 h-72 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center md:justify-between gap-10">
        {/* Left column: */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
            Streako
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Track your habits. Build consistency. Achieve your goals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard card */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-4 hover:shadow-2xl hover:scale-102 transition-transform transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
              Today's Streak
            </h3>
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-2xl">5</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Days in a row</p>
              </div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                +1
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Read 20 pages</span>
                <span>✅</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Meditate 10 min</span>
                <span>❌</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Exercise 30 min</span>
                <span>✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

