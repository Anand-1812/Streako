import "./index.css";
import App from "./App.jsx";
import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login.jsx";
import ContextProvider from "./context/Context.jsx";
import Signup from "./components/Signup/Signup.jsx";
import UserHome from "./components/Users/UserHome.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/Routing/ProtectedRoute.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "home/login", element: <Navigate to="/login" replace /> },
        { path: "home/signup", element: <Navigate to="/signup" replace /> },
        { path: "home/user", element: <Navigate to="/app/habits" replace /> },
        { path: "home/user/dashboard", element: <Navigate to="/app/insights" replace /> },
        {
          path: "app",
          element: <ProtectedRoute />,
          children: [
            { index: true, element: <Navigate to="habits" replace /> },
            { path: "habits", element: <UserHome /> },
            { path: "insights", element: <Dashboard /> },
          ],
        },
      ],
    },
  ]
);

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
