import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If user already signed up and logged in, go to dashboard automatically
    const signedUp = localStorage.getItem("hasSignedUp") === "true";
    const userEmail = localStorage.getItem("userEmail");
    if (signedUp && userEmail) navigate("/dashboard");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("userEmail");

    if (email === savedEmail) {
      // Login success → navigate to dashboard
      navigate("/dashboard");
    } else {
      // Email not found → redirect to signup
      navigate("/signup");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Login</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Welcome back! Continue building habits with <span className="text-blue-600 dark:text-blue-400 font-semibold">Streako</span>.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-transform duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}

