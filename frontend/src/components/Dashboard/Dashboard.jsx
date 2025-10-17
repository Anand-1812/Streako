import { useEffect, useState } from "react";
import { Calendar, Trophy, CheckCircle2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import FloatingDiv from "../FloatingDivs/FloatingDiv";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const signedUp = localStorage.getItem("hasSignedUp") === "true";
    const email = localStorage.getItem("userEmail");

    if (!signedUp) navigate("/signup");
    else setUserEmail(email);
  }, []);

  const [habits, setHabits] = useState([
    { id: 1, task: "Read 20 pages", done: true },
    { id: 2, task: "Code 4 hours", done: true },
    { id: 3, task: "Gym 1.5 hours", done: false },
  ]);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  const mockMetrics = [
    { label: "Current Streak", value: 5, icon: <Calendar className="w-6 h-6 text-blue-500" /> },
    { label: "Best Streak", value: 10, icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
    { label: "Completion Rate", value: "69%", icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
  ];

  const lineData = [
    { day: "Mon", streak: 3 },
    { day: "Tue", streak: 4 },
    { day: "Wed", streak: 5 },
    { day: "Thu", streak: 5 },
    { day: "Fri", streak: 6 },
    { day: "Sat", streak: 6 },
    { day: "Sun", streak: 7 },
  ];

  const barData = habits.map((habit) => ({
    name: habit.task,
    completed: habit.done ? 1 : 0,
  }));

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900 px-6 py-24 overflow-hidden">
      <FloatingDiv />

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-12">

        {/* Welcome Message */}
        {userEmail && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, <span className="text-blue-600 dark:text-blue-400">{userEmail}</span>!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Here's your habit dashboard:</p>
          </div>
        )}

        {/* Metrics */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          {mockMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex-1 flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">{metric.icon}</div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Graphs */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          {/* Line Chart */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Weekly Streak</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="day" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip />
                <Line type="monotone" dataKey="streak" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Habit Completion</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="#8884d8" width={150} />
                <Tooltip />
                <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Habits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-transform duration-300 flex flex-col gap-6">
          <h3 className="text-gray-900 dark:text-white font-semibold text-xl">Today's Habits</h3>
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <span className="text-gray-900 dark:text-gray-200 font-medium">{habit.task}</span>
              <span className={`text-xl font-bold ${habit.done ? "text-green-500" : "text-red-500"}`}>
                {habit.done ? "✅" : "❌"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

