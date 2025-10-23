import { useNavigate } from "react-router-dom";
import { FaChartLine, FaBell, FaFire } from "react-icons/fa";
import developer_activity from "../assets/activity.svg"
import stepping_up from "../assets/progress.svg"
import climbingAnimation from "../assets/climb.json";
import Lottie from "lottie-react";;

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Track Streaks",
      icon: <FaFire className="w-10 h-10 text-red-500 mb-4" />,
      description:
        "Visualize your daily consistency with a beautiful heatmap and progress insights.",
    },
    {
      title: "Daily Reminders",
      icon: <FaBell className="w-10 h-10 text-red-500 mb-4" />,
      description:
        "Stay accountable with reminders that keep your habits alive every single day.",
    },
    {
      title: "Advanced Analytics",
      icon: <FaChartLine className="w-10 h-10 text-red-500 mb-4" />,
      description:
        "Understand your progress with in-depth habit analytics and personalized trends.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-8 md:px-12 py-24">
        {/* Text */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Build Better{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
              Habits
            </span>{" "}
            Every Day
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Turn consistency into success with <span className="font-semibold text-red-500">Streako</span> — track your daily habits and grow one streak at a time.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate("/home/signup")}
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold rounded-2xl shadow-md hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center mb-12 md:mb-0">
          <img
            src={developer_activity}
            alt="Developer working"
            className="w-[85%] max-w-[520px] drop-shadow-lg animate-float"
          />
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6">Why Choose Streako?</h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Streako isn’t just a tracker — it’s your companion in building a better version of yourself.
          Every checkmark is a step closer to your goals.
        </p>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="py-24 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center border border-gray-100 dark:border-gray-700"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex-1 flex justify-center mb-12 md:mb-0 order-2 md:order-1">
          <Lottie animationData={climbingAnimation} loop={true} 
            className="w-[85%] max-w-[400px] "
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-6 order-1 md:order-2">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Every Step <span className="text-red-500">Counts</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            You don't need to be perfect — just consistent. Start your journey with Streako today.
          </p>
          <button
            onClick={() => navigate("/home/user")}
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold rounded-2xl shadow-md hover:scale-105 transition-transform"
          >
            Start Your Streak
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;

