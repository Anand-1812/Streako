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
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden scroll-smooth">
      {/* Home Section */}
      <section
        id="home"
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden"
      >
        {/* Floating shapes */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-100 rounded-full opacity-20 animate-blob"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Are you still <span className="text-red-500">planning</span>{" "}
            <span className="inline-block text-red-500 animate-float text-6xl font-bold">?</span>
          </h1>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Build your <span className="text-red-500">habits</span> with Streako
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Small steps. Daily progress. Lasting change.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold rounded-2xl shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative z-10 w-full md:w-[600px] mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Today’s Progress</h3>

          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Days in a row</p>
            </div>
            <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg text-sm font-semibold">
              +1
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Read 20 pages</span>
              <span>✅</span>
            </div>
            <div className="flex justify-between">
              <span>Meditate 10 min</span>
              <span>❌</span>
            </div>
            <div className="flex justify-between">
              <span>Exercise 30 min</span>
              <span>✅</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative w-full flex flex-col items-center text-center py-24 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Streako?</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Streako helps you track your daily habits, stay consistent, and build routines that stick.
            With visual progress tracking, streaks, and gentle reminders, you can focus on what matters most.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative w-full py-24 px-6 bg-gray-100 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-4 bg-black dark:bg-gray-800 text-white text-lg font-semibold rounded-2xl shadow-md hover:opacity-90 transition"
          >
            Start Building Your Streak
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
