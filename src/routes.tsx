import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Plans from './pages/Plans'
import Signup from './pages/Signup'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/plans',
    element: <Plans />,
  },
  {
    path: '/signup',
    element: <Signup />,
  }
])