import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Imported for a better loading spinner
import { Context } from "../../context/Context";

function UserHome() {
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const res = await fetch("http://localhost:7000/home/user", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
          setIsLoggedIn(true)
        } else {
          console.error("Server Error:", data.error);
          setUser(null);
          }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mr-3" />
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-200">
          Loading user data...
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">
          Access Denied 🔒
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          We couldn't retrieve your user information. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Welcome back,
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300  to-red-400">
            {user.name}
          </span>
          !
        </h1>

        <div className="mt-8 p-6 md:p-10 max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            Your Account
          </h2>
          <div className="space-y-3">
            <p className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Name:</span>
              <span className="text-gray-900 dark:text-white font-mono">{user.name}</span>
            </p>
            <p className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email:</span>
              <span className="text-gray-900 dark:text-white font-mono">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Card */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-blue-500 mb-3">Your Streak</h3>
                <p className="text-4xl font-extrabold">14 Days</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Keep it up!</p>
            </div>
             {/* Example Card */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-indigo-500 mb-3">Tasks Completed</h3>
                <p className="text-4xl font-extrabold">85%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
            </div>
             {/* Example Card */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-green-500 mb-3">Badges Earned</h3>
                <p className="text-4xl font-extrabold">5</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Explore new goals</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
