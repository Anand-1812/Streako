import './index.css'
import App from './App.jsx'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import { createRoot } from 'react-dom/client'
import Login from './components/Login/Login.jsx'
import ContextProvider from './context/Context.jsx'
import Signup from './components/Signup/Signup.jsx'
import UserHome from './components/Users/UserHome.jsx'
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'home/signup', element: <Signup /> },
        { path: 'home/login', element: <Login /> },
        { path: 'home/user', element: <UserHome /> },
        { path: 'home/user/dashboard', element: <Dashboard /> },
      ]
    }
  ]
);
;

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>,
)
