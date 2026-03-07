import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChartNoAxesCombined,
  CheckCircle2,
  Flame,
  Target,
} from "lucide-react";
import { Context } from "../context/context.js";

const featureCards = [
  {
    title: "One clear daily view",
    description:
      "See what needs attention today without digging through extra controls or noisy panels.",
    icon: Target,
  },
  {
    title: "Streaks with context",
    description:
      "Track consistency with enough signal to stay motivated, without turning the interface into a scoreboard.",
    icon: Flame,
  },
  {
    title: "Useful progress feedback",
    description:
      "Charts and reminders stay lightweight so they support action instead of distracting from it.",
    icon: ChartNoAxesCombined,
  },
];

const previewHabits = [
  { title: "Morning walk", streak: "12 days", complete: true },
  { title: "Read for 20 minutes", streak: "8 days", complete: true },
  { title: "No late-night scrolling", streak: "5 days", complete: false },
  { title: "Stretch break", streak: "4 days", complete: true },
];

const previewRhythm = [0, 1, 2, 1, 0, 2, 2, 1, 2, 0, 1, 2, 2, 1];

const steps = [
  "Add the routines that actually matter this week.",
  "Check them off in a few seconds and keep the streak visible.",
  "Use the dashboard to notice patterns before motivation drops.",
];

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(Context);

  if (isLoggedIn) {
    return <Navigate to="/app/habits" replace />;
  }

  return (
    <div className="pb-24">
      <section className="px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
              Habit tracking, simplified
            </p>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-stone-950 md:text-7xl dark:text-white">
              Build better habits with a calmer, clearer daily flow.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 md:text-xl dark:text-stone-300">
              Streako helps you stay consistent without overwhelming the screen.
              Track habits, protect streaks, and keep progress obvious from the moment you open the app.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
              >
                Start your streak
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
              >
                See the approach
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-600 dark:text-stone-300">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Daily habit list
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Streak history
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Lightweight insights
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200/70 bg-white/80 p-6 shadow-[0_32px_90px_-55px_rgba(32,22,14,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200/70 pb-5 dark:border-white/10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600 dark:text-orange-300">
                  Daily overview
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
                  Today is about maintaining momentum.
                </h2>
              </div>

              <div className="rounded-2xl bg-orange-50 px-4 py-3 text-right dark:bg-orange-500/10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-300">
                  Consistency
                </p>
                <p className="mt-1 text-2xl font-bold text-stone-950 dark:text-white">84%</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
                <span>3 of 4 habits complete</span>
                <span>Best streak: 12 days</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-stone-200 dark:bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {previewHabits.map((habit) => (
                <div
                  key={habit.title}
                  className="flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-50/80 px-4 py-3 dark:border-white/10 dark:bg-black/10"
                >
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">
                      {habit.title}
                    </p>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {habit.streak}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      habit.complete
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "bg-stone-200 text-stone-700 dark:bg-white/10 dark:text-stone-300"
                    }`}
                  >
                    {habit.complete ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-stone-200/70 pt-5 dark:border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-900 dark:text-white">
                  Recent rhythm
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Last 14 days</p>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {previewRhythm.map((value, index) => (
                  <span
                    key={`${value}-${index}`}
                    className={`h-4 rounded-md ${
                      value === 2
                        ? "bg-emerald-500"
                        : value === 1
                          ? "bg-orange-300"
                          : "bg-stone-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
              Design principles
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-white">
              The interface stays focused on what helps you return tomorrow.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-[1.6rem] border border-stone-200/70 bg-white/75 p-6 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.4)] dark:border-white/10 dark:bg-white/5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-stone-950 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-stone-600 dark:text-stone-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pt-12">
        <div className="mx-auto grid max-w-7xl gap-12 border-t border-stone-200/70 pt-12 dark:border-white/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-white">
              Reduce the friction, then let consistency do the rest.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">
              Streako is designed so the next action is always clear. Add a habit,
              check it off, and review your rhythm without navigating through clutter.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
              >
                Create an account
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
              >
                Log in
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.6rem] border border-stone-200/70 bg-white/75 p-5 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-sm font-semibold text-white dark:bg-white dark:text-stone-950">
                  0{index + 1}
                </span>
                <p className="pt-1 text-base leading-7 text-stone-700 dark:text-stone-200">
                  {step}
                </p>
              </div>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-stone-200/70 bg-stone-50/90 p-5 dark:border-white/10 dark:bg-black/10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                  Habit focus
                </p>
                <p className="mt-3 text-3xl font-semibold text-stone-950 dark:text-white">4 active</p>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  A short list stays more realistic and easier to sustain.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-stone-200/70 bg-stone-50/90 p-5 dark:border-white/10 dark:bg-black/10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                  Review cadence
                </p>
                <p className="mt-3 text-3xl font-semibold text-stone-950 dark:text-white">1 glance</p>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  The dashboard is meant to inform the next day, not overwhelm the current one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
