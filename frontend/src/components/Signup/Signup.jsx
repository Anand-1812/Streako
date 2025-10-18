import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Signup() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7000/home/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      toast.success("Singup successful");
      setTimeout(() => navigate("/home/user"), 1000);
    } else {
      toast.error("Signup failed");
    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Toaster position="top-center" />
      {/* Overlay above everything, blocks background clicks */}

      {/* Floating blobs */}
      <div className="absolute -top-20 -left-20 w-56 h-56 bg-red-100 dark:bg-red-900 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -right-28 w-64 h-64 bg-red-200 dark:bg-red-800 rounded-full opacity-20 animate-blob animation-delay-2000"></div>

      {/* Form card */}
      <div className="relative flex flex-col md:flex-row z-60 max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left - Header / Info */}
        <div
          className="p-12 flex flex-col justify-center items-start border-r border-gray-600 dark:border-gray-800
            bg-gradient-to-bl from-gray-600 via-gray-700 to-gray-800 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Welcome to <br /> <span className="text-red-400 dark:text-red-500">Streako</span>
          </h2>
          <p className="text-white text-lg md:text-xl leading-relaxed mt-2">
            Build your habits.<br />
            Track your streaks.<br />
            Stay consistent every day.
          </p>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-2/3 p-12 flex flex-col gap-6 bg-white dark:bg-gray-800">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={userData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-2 block w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
              className="mt-2 block w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
              className="mt-2 block w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 rounded-2xl bg-black dark:bg-gray-900 text-white font-semibold py-3 shadow-lg hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?{' '}
            <a href="/home/login" className="font-semibold text-red-500 hover:text-red-400">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

