import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Home from './Home/Home.jsx'
import About from './About/About.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Signup from './components/Auth/Signup.jsx'
import Login from './components/Auth/Login.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> }
      ]
    }
  ]
);
;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
