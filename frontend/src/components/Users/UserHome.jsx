import toast from "react-hot-toast";
import { Context } from "../../context/context.js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Loader2,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { enrichHabits } from "../../utils/habits.js";

function UserHome() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, isLoggedIn, loading: contextLoading } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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

  const addHabit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return toast.error("Habit title is required");

    setAdding(true);

    try {
      const res = await fetch(`${apiUrl}/home/habits/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();

      if (res.ok) {
        setHabits((prev) => enrichHabits([data.data, ...prev]));
        setTitle("");
        setDescription("");
        setIsFormOpen(false);
        toast.success("Habit added successfully");
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

  const toggleHabitCompletion = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/home/habits/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setHabits((prev) =>
          prev.map((habit) =>
            habit._id === id ? enrichHabits([data.data])[0] : habit
          )
        );
      } else {
        toast.error(data.error || "Failed to update habit");
      }
    } catch (err) {
      console.error("Toggle habit error:", err);
      toast.error("Server error");
    }
  };

  const deleteHabit = async (id) => {
    setDeletingId(id);

    try {
      const res = await fetch(`${apiUrl}/home/habits/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setHabits((prev) => prev.filter((habit) => habit._id !== id));
        toast.success("Habit removed");
      } else {
        toast.error(data.error || "Failed to delete habit");
      }
    } catch (err) {
      console.error("Delete habit error:", err);
      toast.error("Server error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading || contextLoading) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/85 px-5 py-3 text-sm font-semibold text-stone-700 shadow-[0_20px_50px_-35px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
          <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
          Loading your habits
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) return null;

  const completedToday = habits.filter((habit) => habit.isCompletedToday).length;
  const totalStreakDays = habits.reduce((total, habit) => total + (habit.streak || 0), 0);
  const isNewUser = habits.length === 0;

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-stone-200/70 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
              Workspace
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-white">
              Welcome back, {user.name}.
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-600 dark:text-stone-300">
              {isNewUser
                ? "Start with one habit worth repeating this week."
                : "Keep today simple: finish the habits that move your streaks forward."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setIsFormOpen((open) => !open)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
            >
              <PlusCircle className="h-4 w-4" />
              {isFormOpen ? "Close form" : "Add habit"}
            </button>
            <button
              onClick={() => navigate("/app/insights")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/80 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
            >
              View insights
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "Active habits", value: habits.length, detail: "Keep the list short enough to sustain." },
            { label: "Completed today", value: completedToday, detail: "A visible finish line helps consistency." },
            { label: "Total streak days", value: totalStreakDays, detail: "Small repeated wins compound over time." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.6rem] border border-stone-200/70 bg-white/80 p-5 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-stone-950 dark:text-white">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <form
            onSubmit={addHabit}
            className="mt-8 rounded-[1.75rem] border border-stone-200/70 bg-white/80 p-6 shadow-[0_28px_80px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start">
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                  Habit title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Morning walk"
                  className="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-white/10 dark:bg-black/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-400 dark:focus:ring-orange-500/10"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                  Optional description
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Keep it short and specific."
                  className="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-white/10 dark:bg-black/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-400 dark:focus:ring-orange-500/10"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={adding}
                className="inline-flex items-center justify-center gap-2 self-end rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
              >
                {adding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" />
                    Create habit
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {isNewUser && !isFormOpen ? (
          <div className="mt-8 rounded-[1.9rem] border border-dashed border-stone-300 bg-white/70 p-10 text-center dark:border-white/15 dark:bg-white/5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              <Flame className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-stone-950 dark:text-white">
              Start with one habit.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-300">
              A smaller list is easier to repeat. Add your first habit and build consistency from there.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
            >
              <PlusCircle className="h-4 w-4" />
              Add your first habit
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {habits.map((habit) => (
              <article
                key={habit._id}
                className={`rounded-[1.75rem] border p-6 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.35)] transition ${
                  habit.isCompletedToday
                    ? "border-emerald-200 bg-emerald-50/75 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                    : "border-stone-200/70 bg-white/80 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        habit.isCompletedToday
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-stone-200 text-stone-700 dark:bg-white/10 dark:text-stone-300"
                      }`}
                    >
                      {habit.isCompletedToday ? "Done today" : "Pending"}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
                      {habit.title}
                    </h3>
                    {habit.description && (
                      <p className="mt-3 text-base leading-7 text-stone-600 dark:text-stone-300">
                        {habit.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteHabit(habit._id)}
                    disabled={deletingId === habit._id}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-500 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-black/10 dark:text-stone-300 dark:hover:border-red-400/20 dark:hover:text-red-300"
                    title="Delete habit"
                  >
                    {deletingId === habit._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-stone-200/70 pt-5 dark:border-white/10">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                      Current streak
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white">
                      {habit.streak || 0}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">days</p>
                  </div>

                  <button
                    onClick={() => toggleHabitCompletion(habit._id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                      habit.isCompletedToday
                        ? "bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {habit.isCompletedToday ? "Undo today" : "Mark complete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UserHome;
