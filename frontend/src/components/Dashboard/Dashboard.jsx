import toast from "react-hot-toast";
import HeatMap from "@uiw/react-heat-map";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context.js";
import { useEffect, useState, useContext } from "react";
import { ArrowLeft, Calendar, CheckCircle2, Flame, Loader2 } from "lucide-react";
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
import { buildHeatMapData, enrichHabits } from "../../utils/habits.js";

function Dashboard() {
  const { user, isLoggedIn, loading: contextLoading } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isLoggedIn) return undefined;

    const fetchHabits = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${apiUrl}/home/habits`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setHabits(enrichHabits(data.data));
        } else {
          toast.error(data.error || "Failed to fetch habits");
        }
      } catch (err) {
        console.error("Fetch habits error:", err);
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
    return undefined;
  }, [apiUrl, isLoggedIn]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (loading || contextLoading) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/85 px-5 py-3 text-sm font-semibold text-stone-700 shadow-[0_20px_50px_-35px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
          <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
          Loading your insights
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) return null;

  const completedToday = habits.filter((habit) => habit.isCompletedToday).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0;
  const bestStreak = habits.reduce((best, habit) => Math.max(best, habit.streak || 0), 0);

  const heatMapData = buildHeatMapData(habits);
  const lineData = habits.map((habit) => ({
    name: habit.title,
    streak: habit.streak || 0,
  }));
  const barData = habits.map((habit) => ({
    name: habit.title,
    completed: habit.history?.filter((entry) => entry.completed).length || 0,
  }));

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 6);

  const axisColor = isDarkMode ? "#d6d3d1" : "#57534e";
  const gridColor = isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(87,83,78,0.12)";
  const tooltipStyle = {
    backgroundColor: isDarkMode ? "#17110b" : "#fff8f2",
    borderRadius: "16px",
    border: "1px solid rgba(120,113,108,0.18)",
    color: isDarkMode ? "#fff7ef" : "#221912",
  };

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-stone-200/70 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
              Insights
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-white">
              A clearer view of your progress, {user.name}.
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-600 dark:text-stone-300">
              Keep the dashboard readable enough to guide the next day, not distract from it.
            </p>
          </div>

          <button
            onClick={() => navigate("/app/habits")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/80 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to habits
          </button>
        </header>

        {totalHabits === 0 ? (
          <div className="mt-8 rounded-[1.9rem] border border-dashed border-stone-300 bg-white/70 p-10 text-center dark:border-white/15 dark:bg-white/5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              <Flame className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-stone-950 dark:text-white">
              No data yet.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-300">
              Add a few habits first, then come back here to review streaks, completions, and recent rhythm.
            </p>
            <button
              onClick={() => navigate("/app/habits")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
            >
              Go to habits
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Habits today",
                  value: `${completedToday}/${totalHabits}`,
                  detail: "A quick read on today’s workload.",
                  icon: Calendar,
                },
                {
                  label: "Completion rate",
                  value: `${completionRate}%`,
                  detail: "Enough signal to show whether the routine is holding.",
                  icon: CheckCircle2,
                },
                {
                  label: "Best streak",
                  value: bestStreak,
                  detail: "Your strongest run so far.",
                  icon: Flame,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[1.6rem] border border-stone-200/70 bg-white/80 p-5 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-stone-950 dark:text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white/80 p-6 shadow-[0_28px_80px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-xl font-semibold text-stone-950 dark:text-white">
                  Current streaks
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  A quick comparison of which habits are holding up right now.
                </p>

                <div className="mt-6 h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid stroke={gridColor} vertical={false} />
                      <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor, fontSize: 12 }} />
                      <YAxis
                        stroke={axisColor}
                        allowDecimals={false}
                        tick={{ fill: axisColor, fontSize: 12 }}
                      />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line
                        type="monotone"
                        dataKey="streak"
                        stroke="#f45d22"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#f45d22" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-stone-200/70 bg-white/80 p-6 shadow-[0_28px_80px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-xl font-semibold text-stone-950 dark:text-white">
                  Completed sessions
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  Total completed entries per habit, useful for spotting the most repeated routines.
                </p>

                <div className="mt-6 h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{ left: 12 }}>
                      <CartesianGrid stroke={gridColor} horizontal={false} />
                      <XAxis
                        type="number"
                        stroke={axisColor}
                        allowDecimals={false}
                        tick={{ fill: axisColor, fontSize: 12 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke={axisColor}
                        width={120}
                        tick={{ fill: axisColor, fontSize: 12 }}
                      />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="completed" fill="#fb923c" radius={[8, 8, 8, 8]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-stone-200/70 bg-white/80 p-6 shadow-[0_28px_80px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-semibold text-stone-950 dark:text-white">
                Recent contribution graph
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                A compact view of how often habits have been completed over the last six months.
              </p>

              <div className="mt-6 overflow-x-auto pb-2">
                <HeatMap
                  value={heatMapData}
                  startDate={startDate}
                  endDate={today}
                  width={980}
                  rectSize={15}
                  height={140}
                  rectProps={{ rx: 3, ry: 3 }}
                  panelColors={
                    isDarkMode
                      ? { 0: "#2b2119", 1: "#5b3a1f", 2: "#a14b1a", 3: "#dd6b20", 4: "#fb923c" }
                      : { 0: "#f5ede4", 1: "#f7c694", 2: "#fb923c", 3: "#f45d22", 4: "#cf4311" }
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
