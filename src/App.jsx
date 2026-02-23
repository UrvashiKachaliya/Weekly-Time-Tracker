import { useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Aboutus from './components/Pages/TimeTracker'
import TermsandConditions from './components/Pages/T&C'
import Home from './components/Pages/Home'
import MainLayout from './components/Layout/MainLayout'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import Contactus from './components/Pages/Contactus'
import Products from './components/Pages/products/Productslisting'
import Login from './components/Pages/login/Login'

const router = createBrowserRouter([
      // {path: "/login", element: <Login />},

  {path: "/", element: <MainLayout />, children: [
    {
      path: "/home", element: <Home />
    },
    {
      path: "/", element: <Aboutus />

    },
    {path: "/terms", element: <TermsandConditions />},
    {path: "/contact", element: <Contactus />},
    {path: "/products", element: <Products />},
    {path: "/login", element: <Login />},
  ]


  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App
