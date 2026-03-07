import { useContext } from "react";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Context } from "../../context/context.js";

function ProtectedRoute() {
  const { isLoggedIn, loading, user } = useContext(Context);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/85 px-5 py-3 text-sm font-semibold text-stone-700 shadow-[0_20px_50px_-35px_rgba(32,22,14,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
          <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
          Loading your workspace
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
