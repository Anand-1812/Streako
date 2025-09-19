import studyImg from "../assets/study.svg";
import activityImg from "../assets/activity.svg";
import meditateImg from "../assets/meditate.svg"

function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center text-gray-900
      dark:bg-gradient-to-t from-gray-800 to-gray-950
      ">
      <div className="mx-w-7xl mx-auto text-center px-6">
        <h1 className="text-xl md:text-4xl font-bold mb-4 dark:text-gray-100">
          <span className="font-display text-2xl md:text-5xl font-extrabold bg-clip-text text-transparent
            bg-gradient-to-r from-blue-700 to-purple-500">
            Streako
          </span>, a habit tracker application
        </h1>
        <p className="text-md md:text-xl mb-8 opacity-80 dark:text-gray-200">
          Track your habits like games to maintain streaks and gain xp.
        </p>

        {/* Illustrations */}
        <div className="flex items-center justify-center gap-8 mb-10">
          <img
            src={studyImg}
            alt="Study habit"
            className="w-12 h-12 md:w-28 md:h-28 drop-shadow-lg hover:scale-110 transition"
          />
          <img
            src={activityImg}
            alt="Activity habit"
            className="w-16 h-16 md:w-32 md:h-32 drop-shadow-lg hover:scale-110 transition"
          />
          <img
            src={meditateImg}
            alt="Meditation habit"
            className="w-16 h-16 md:w-32 md:h-32 drop-shadow-lg hover:scale-110 transition"
          />
        </div>

        {/* Call to Action */}
        <button
          className="cursor-pointer px-6 py-3 bg-purple-600 text-white font-semibold
          rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition"
        >
          Get Started
        </button>
      </div>
    </main>
  )
}

export default Home

