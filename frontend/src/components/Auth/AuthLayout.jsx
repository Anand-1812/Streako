import { ChartNoAxesCombined, Flame, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

const highlights = [
  {
    title: "Fast daily check-ins",
    description: "The product is designed so routine actions stay quick and obvious.",
    icon: Flame,
  },
  {
    title: "Lightweight insights",
    description: "Progress signals stay useful without crowding the screen.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Steady visual rhythm",
    description: "Spacing and hierarchy are kept calm so returning feels easier.",
    icon: ShieldCheck,
  },
];

function AuthLayout({
  eyebrow,
  title,
  description,
  formHeading,
  formHint,
  alternateQuestion,
  alternateLabel,
  alternateTo,
  children,
}) {
  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl pt-4 md:pt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-950 md:text-5xl dark:text-white">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-300">
            {description}
          </p>

          <div className="mt-10 space-y-5">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="border-t border-stone-200/70 pt-5 first:border-t-0 first:pt-0 dark:border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-stone-950 dark:text-white">
                        {highlight.title}
                      </h2>
                      <p className="mt-2 text-base leading-7 text-stone-600 dark:text-stone-300">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200/70 bg-white/80 p-8 shadow-[0_28px_80px_-55px_rgba(32,22,14,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">
            {formHeading}
          </p>
          <p className="mt-3 text-base leading-7 text-stone-600 dark:text-stone-300">
            {formHint}
          </p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-sm text-stone-500 dark:text-stone-400">
            {alternateQuestion}{" "}
            <NavLink
              to={alternateTo}
              className="font-semibold text-orange-600 transition hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200"
            >
              {alternateLabel}
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
