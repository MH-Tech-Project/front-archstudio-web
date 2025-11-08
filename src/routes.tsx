import { createBrowserRouter } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Plans from './pages/Plans'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'
import AppLayout from './layouts/AppLayout'

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  plans: '/plans',
  dashboard: '/dashboard',
  resetPassword: '/reset-password',
  resetPasswordConfirm: '/reset-password/:token',
} as const

export type AppRouteList = typeof routes
export type RouteName = keyof AppRouteList

export type AppRouteProps<T extends keyof AppRouteList> = 
  RouteProps & { path: AppRouteList[T] }

export type RedirectTo = AppRouteList[keyof AppRouteList]

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.plans,
    element: <Plans />,
  },
  {
    path: routes.signup,
    element: <Signup />,
  },
  {
    path: routes.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: routes.resetPasswordConfirm,
    element: <ResetPasswordConfirm />,
  },
  {
    element: <AppLayout />,
    children:[
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
    ]
  }
])