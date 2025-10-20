import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Signup from './components/Signup/Signup.jsx'
import UserHome from './components/Users/UserHome.jsx'
import Login from './components/Login/Login.jsx'
import ContextProvider from './context/Context.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'home/dashboard', element: <Dashboard /> },
        { path: 'home/signup', element: <Signup /> },
        { path: 'home/login', element: <Login /> },
        { path: 'home/user', element: <UserHome /> }
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
