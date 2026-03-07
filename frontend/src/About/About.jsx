import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  ChartNoAxesCombined,
  Flame,
  ShieldCheck,
  Target,
} from "lucide-react";

const pillars = [
  {
    title: "Visible progress",
    description:
      "The product makes movement easy to read so you can respond quickly instead of guessing how the week is going.",
    icon: Flame,
  },
  {
    title: "Low-friction actions",
    description:
      "The interface stays simple enough that checking in feels faster than avoiding the task.",
    icon: Target,
  },
  {
    title: "Supportive signals",
    description:
      "Reminders and analytics exist to guide consistency, not to compete with the primary task.",
    icon: ChartNoAxesCombined,
  },
];

const guidelines = [
  {
    title: "Calm hierarchy",
    description:
      "Pages are structured around one dominant action, one supporting section, and one clear close.",
    icon: ShieldCheck,
  },
  {
    title: "Gentle accountability",
    description:
      "Streaks should create momentum without making the experience feel punitive after a missed day.",
    icon: BellRing,
  },
];

function About() {
  return (
    <div className="px-6 pb-24">
      <section className="mx-auto max-w-4xl pt-10 text-center md:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
          About Streako
        </p>
        <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-stone-950 md:text-6xl dark:text-white">
          A habit tracker designed to feel clear before it feels clever.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-300">
          Streako is built around a simple idea: if progress is easier to see, it is easier to repeat.
          The product keeps habits, streaks, and insights close enough to support action without crowding the screen.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <NavLink
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </NavLink>
          <NavLink
            to="/home"
            className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-stone-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
          >
            Back to home
          </NavLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl py-14 md:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-[1.7rem] border border-stone-200/70 bg-white/75 p-6 shadow-[0_24px_70px_-55px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-stone-950 dark:text-white">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-stone-600 dark:text-stone-300">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 border-t border-stone-200/70 pt-12 dark:border-white/10 lg:grid-cols-[1fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
            Design approach
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-white">
            The website should guide attention, not keep demanding it.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">
            The visual system uses a restrained warm palette, consistent spacing, and fewer competing surfaces.
            That keeps the brand feeling distinctive while making the interface easier to scan.
          </p>
        </div>

        <div className="space-y-4">
          {guidelines.map((guideline) => {
            const Icon = guideline.icon;

            return (
              <article
                key={guideline.title}
                className="rounded-[1.7rem] border border-stone-200/70 bg-stone-50/90 p-6 dark:border-white/10 dark:bg-black/10"
              >
                <Icon className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                <h3 className="mt-4 text-xl font-semibold text-stone-950 dark:text-white">
                  {guideline.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-stone-600 dark:text-stone-300">
                  {guideline.description}
                </p>
              </article>
            );
          })}

          <div className="rounded-[1.7rem] border border-stone-200/70 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              In practice
            </p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-stone-700 dark:text-stone-200">
              <li>Less visual noise around navigation and calls to action.</li>
              <li>More whitespace so content blocks can breathe.</li>
              <li>Clearer separation between primary, secondary, and background elements.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
