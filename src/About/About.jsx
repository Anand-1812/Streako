import { NavLink } from "react-router-dom";
import { FaChartLine, FaBell, FaFire } from "react-icons/fa";

function About() {
  const features = [
    { title: "Track Streaks", icon: <FaFire className="w-8 h-8 text-blue-500 mb-3" />, description: "See how many days you’ve maintained a habit and stay motivated." },
    { title: "Daily Reminders", icon: <FaBell className="w-8 h-8 text-purple-500 mb-3" />, description: "Never miss a habit with gentle reminders and notifications." },
    { title: "Analytics", icon: <FaChartLine className="w-8 h-8 text-indigo-500 mb-3" />, description: "Track your progress with charts and see trends over time." },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden pt-24 md:pt-32">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-purple-50 dark:from-gray-800 dark:via-transparent dark:to-gray-900 pointer-events-none"></div>

      {/* Floating accent shapes */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-300 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -right-32 w-72 h-72 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

      {/* Intro */}
      <div className="relative z-10 max-w-4xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Hi, I'm Anand Kumar
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
          I build clean, modern, and trustworthy websites. My goal is to help people create better habits and improve their daily routines.
        </p>
      </div>

      {/* Why Streako */}
      <section className="relative z-10 my-16 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
          Why Streako?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Streako helps you track your daily habits, stay consistent, and build routines that stick.
          With visual progress tracking, streaks, and gentle reminders, you can focus on what matters most.
        </p>
      </section>

      {/* Features */}
      <section className="relative z-10 my-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform transition-shadow duration-300 text-center">
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Call to action */}
      <div className="relative z-10 text-center my-16">
        <NavLink
          to="/home"
          className="px-12 py-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 transition duration-300"
        >
          Start Building Your Streak
        </NavLink>
      </div>
    </section>
  );
}

export default About;

