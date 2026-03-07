import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout.jsx";
import { Context } from "../../context/context.js";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(Context);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  if (isLoggedIn && user) {
    return <Navigate to="/app/habits" replace />;
  }

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/home/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsLoggedIn(true);
        toast.success("Login successful");
        navigate(location.state?.from?.pathname || "/app/habits");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("login error:", error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Pick up the streak exactly where you left it."
      description="Log in to review today’s habits, protect your active streaks, and keep your routine in motion."
      formHeading="Log in"
      formHint="Use the same account you created for tracking your habits."
      alternateQuestion="Need an account?"
      alternateLabel="Create one"
      alternateTo="/signup"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-stone-700 dark:text-stone-200"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={userData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-400 dark:focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-stone-700 dark:text-stone-200"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-400 dark:focus:ring-orange-500/10"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-200"
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Logging in
            </>
          ) : (
            <>
              Log in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
