import { useEffect, useState, useContext } from "react";
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
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HeatMap from "@uiw/react-heat-map";

function Dashboard() {
  const { user, setUser, setIsLoggedIn } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  useEffect(() => {
    const fetchUserAndHabits = async () => {
      try {
        // Fetch user
        const resUser = await fetch("http://localhost:7000/home/verify", {
          credentials: "include",
        });
        const dataUser = await resUser.json();

        if (resUser.ok) {
          setUser(dataUser.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          navigate("/home/login");
          return;
        }

        // Fetch habits
        const resHabits = await fetch("http://localhost:7000/home/habits", {
          credentials: "include",
        });
        const dataHabits = await resHabits.json();

        if (resHabits.ok) {
          const today = new Date();
          const enriched = (dataHabits.data || []).map((habit) => {
            const lastEntry = habit.history?.[habit.history.length - 1];
            const isCompletedToday =
              lastEntry && isSameDay(new Date(lastEntry.date), today)
                ? lastEntry.completed
                : false;
            return { ...habit, isCompletedToday };
          });
          setHabits(enriched);
        } else {
          toast.error(dataHabits.error || "Failed to fetch habits");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setUser(null);
        navigate("/home/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndHabits();
  }, []);

  const toggleHabit = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/home/habits/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        const today = new Date();
        setHabits((prev) =>
          prev.map((habit) => {
            if (habit._id === id) {
              const updatedHabit = data.data;
              const lastEntry =
                updatedHabit.history?.[updatedHabit.history.length - 1];
              const isCompletedToday =
                lastEntry && isSameDay(new Date(lastEntry.date), today)
                  ? lastEntry.completed
                  : false;
              return { ...updatedHabit, isCompletedToday };
            }
            return habit;
          })
        );
        toast.success("Habit updated!");
      } else {
        toast.error(data.error || "Failed to update habit");
      }
    } catch (err) {
      console.error("Toggle error:", err);
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
          Access Denied 🔒
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  // --- Metrics ---
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  const totalHabits = habits.length;
  const totalStreaks = habits.reduce((acc, h) => acc + (h.streak || 0), 0);

  // HeatMap data
  const heatMapData = habits.flatMap((habit) =>
    habit.history?.map((entry) => ({
      date: entry.date,
      count: entry.completed ? 1 : 0,
    })) || []
  );

  const mockMetrics = [
    {
      label: "Habits Today",
      value: `${completedToday}/${totalHabits}`,
      icon: <Calendar className="text-blue-600 dark:text-blue-400" />,
    },
    {
      label: "Total Streaks",
      value: totalStreaks,
      icon: <Trophy className="text-yellow-500" />,
    },
    {
      label: "Completed Habits",
      value: completedToday,
      icon: <CheckCircle2 className="text-green-500" />,
    },
  ];

  const lineData = habits.map((habit) => ({
    name: habit.title,
    streak: habit.streak || 0,
  }));

  const barData = habits.map((habit) => ({
    name: habit.title,
    completed: habit.isCompletedToday ? 1 : 0,
  }));

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 6);

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-900 px-6 py-24 overflow-x-hidden">
      <div className="w-full max-w-6xl flex flex-col gap-12 relative z-10">
        {/* Welcome */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl text-center transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-red-400 dark:text-red-400">{user.name}</span>!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Here's your progress overview:
          </p>
        </div>

        {/* Metrics */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          {mockMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex-1 flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
                {metric.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
                <p className="text-md text-gray-500 dark:text-gray-400">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          {/* Streaks per Habit */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Streaks per Habit
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                <XAxis
                  dataKey="name"
                  stroke="#aaa"
                  tick={{ fill: "#ddd", fontSize: 12 }}
                />
                <YAxis
                  stroke="#aaa"
                  allowDecimals={false}
                  tick={{ fill: "#ddd", fontSize: 16 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Today's Completion */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Today's Habit Completion
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#aaa"
                  width={150}
                  tick={{ fill: "#ddd", fontSize: 16 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HeatMap Section */}
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-shadow duration-300">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-6 text-xl text-center">
            Daily Habit Contribution Graph
          </h3>
          <div className="flex justify-center overflow-x-auto pb-4">
            <HeatMap
              value={heatMapData}
              startDate={startDate}
              endDate={today}
              width={1000}
              height={150}
              rectSize={16}
              rectProps={{
                rx: 3,
                ry: 3,
                stroke: "rgba(0,0,0,0.05)",
              }}
              panelColors={{
                0: "#ebedf0",
                1: "#9be9a8",
                2: "#40c463",
                3: "#30a14e",
                4: "#216e39",
                5: "#184b2c",
              }}
              style={{
                color: "#216e39",
                "--rhm-bg": "rgba(255, 255, 255, 0.05)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

