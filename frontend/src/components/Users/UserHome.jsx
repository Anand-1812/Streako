import { useContext, useEffect, useState } from "react";
import { Loader2, PlusCircle, CheckCircle } from "lucide-react";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";

function UserHome() {
  const { user, setUser, setIsLoggedIn } = useContext(Context);
  const [loading, setLoading] = useState(true);

  // Habit states
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Fetch user and habits
  useEffect(() => {
    const fetchUserAndHabits = async () => {
      try {
        const resUser = await fetch("http://localhost:7000/home/user", {
          credentials: "include",
        });
        const dataUser = await resUser.json();

        if (resUser.ok) {
          setUser(dataUser.data);
          setIsLoggedIn(true);
        } else {
          setUser(null);
        }

        const resHabits = await fetch("http://localhost:7000/home/habits", {
          credentials: "include",
        });
        const dataHabits = await resHabits.json();

        if (resHabits.ok) {
          // Enrich habits with today status
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
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndHabits();
  }, []);

  // Add a new habit
  const addHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Habit title is required");
    setAdding(true);

    try {
      const res = await fetch("http://localhost:7000/home/habits/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (res.ok) {
        setHabits((prev) => [
          { ...data.data, isCompletedToday: false },
          ...prev,
        ]);
        setTitle("");
        setDescription("");
        setIsFormOpen(false);
        toast.success("Habit added successfully!");
      } else {
        toast.error(data.error || "Failed to add habit");
      }
    } catch (err) {
      console.error("Add habit error:", err);
      toast.error("Server error");
    } finally {
      setAdding(false);
    }
  };

  // Toggle habit completion for today
  const toggleHabitCompletion = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:7000/home/habits/${id}/toggle`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
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
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin mr-3" />
        <span className="text-xl font-medium text-gray-700 dark:text-gray-200">
          Loading your dashboard...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">
          Access Denied 🔒
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Please log in again to access your dashboard.
        </p>
      </div>
    );
  }

  const isNewUser = habits.length === 0;

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
            Welcome back,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
              {user.name}
            </span>
            !
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            {isNewUser
              ? "Start a streak by adding your first habit."
              : "What will you accomplish today?"}
          </p>
        </header>

        {/* Habits Header */}
        <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Habits
          </h2>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            {isFormOpen ? "Close Form" : "Add New Habit"}
          </button>
        </div>

        {/* Habit Form */}
        {isFormOpen && (
          <form
            onSubmit={addHabit}
            className="mb-10 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto transition-all duration-300"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Habit title"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
                rows="3"
              />
              <button
                type="submit"
                disabled={adding}
                className="w-full bg-red-600 text-white dark:bg-red-700 px-4 py-3 font-semibold rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow"
              >
                {adding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Habit...
                  </>
                ) : (
                  "Create Habit"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Habits Grid */}
        {isNewUser && !isFormOpen ? (
          <div className="text-center p-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto mt-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Get Started! Define Your First Goal
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Click <strong>Add New Habit</strong> above to start tracking your
              first streak.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className={`p-6 rounded-xl shadow-md transition-all duration-300 ${habit.isCompletedToday
                  ? "bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                    {habit.title}
                  </h3>
                  <button
                    onClick={() => toggleHabitCompletion(habit._id)}
                    className={`p-1.5 rounded-full transition-colors duration-200 ${habit.isCompletedToday
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                      }`}
                    title={
                      habit.isCompletedToday ? "Mark Incomplete" : "Mark Complete"
                    }
                  >
                    {habit.isCompletedToday ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <PlusCircle className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {habit.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 mb-3">
                    {habit.description}
                  </p>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-md font-bold text-green-600 dark:text-green-400">
                    🔥 Streak: {habit.streak || 0} days
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${habit.isCompletedToday
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {habit.isCompletedToday ? "DONE" : "PENDING"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
