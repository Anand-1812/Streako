import { useNavigate } from "react-router-dom";
import { FaChartLine, FaBell, FaFire } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Track Streaks",
      icon: <FaFire className="w-8 h-8 text-red-500 mb-3" />,
      description: "See how many days you’ve maintained a habit and stay motivated.",
    },
    {
      title: "Daily Reminders",
      icon: <FaBell className="w-8 h-8 text-red-500 mb-3" />,
      description: "Never miss a habit with gentle reminders and notifications.",
    },
    {
      title: "Analytics",
      icon: <FaChartLine className="w-8 h-8 text-red-500 mb-3" />,
      description: "Track your progress with charts and see trends over time.",
    },
  ];

  return (
    <>
      {/* Home Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-100 dark:from-gray-900 dark:via-transparent dark:to-gray-800 pointer-events-none"></div>

        {/* Floating shapes */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-red-100 rounded-full opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -right-28 w-64 h-64 bg-red-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-7xl w-full flex flex-col items-center gap-12">
          {/* Tagline */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Are you still <span className="text-red-500">planning</span>{" "}
              <span className="inline-block text-red-500 animate-float text-5xl font-bold">
                ?
              </span>
            </h1>

            <div className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Build your <span className="text-red-500">habits</span> with Streako
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              Small steps. Daily progress. Lasting change.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl shadow-md hover:opacity-90 transition-all duration-300">
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
          <div className="w-full md:w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col gap-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
              Today’s Progress
            </h3>

            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-2xl">5</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Days in a row</p>
              </div>
              <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg text-sm font-semibold">
                +1
              </div>
            </div>

            <div className="flex flex-col gap-3">
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
      </section>

      {/* About Section */}
      <section className="relative w-full flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden pt-24 md:pt-32">
        {/* Why Streako */}
        <div className="relative z-10 my-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Why Streako?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            Streako helps you track your daily habits, stay consistent, and build routines that stick.
            With visual progress tracking, streaks, and gentle reminders, you can focus on what matters most.
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 my-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-transform transition-shadow duration-300 text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="relative z-10 text-center my-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 text-sm md:text-xl md:px-10 md:py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl shadow-lg hover:opacity-90 transition duration-300"
          >
            Start Building Your Streak
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;

