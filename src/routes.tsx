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
import PrivateRoute from './components/PrivateRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import Project from './pages/Project'

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  plans: '/plans',
  resetPassword: '/reset-password',
  resetPasswordConfirm: '/reset-password/:token',
  dashboard: '/dashboard',
  projects: '/projects',
  project: '/project/:id',
  settings: '/settings',
  meetings: '/meetings',
  configurations: '/configurations',
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
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: routes.plans,
    element: <Plans />,
  },
  {
    path: routes.signup,
    element: (
      <PublicOnlyRoute>
        <Signup />
      </PublicOnlyRoute>
    ),
  },
  {
    path: routes.resetPassword,
    element: (
      <PublicOnlyRoute>
        <ResetPassword />
      </PublicOnlyRoute>
    ),
  },
  {
    path: routes.resetPasswordConfirm,
    element: (
      <PublicOnlyRoute>
        <ResetPasswordConfirm />
      </PublicOnlyRoute>
    ),
  },
  {
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children:[
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.project,
        element: <Project />,
      }
    ]
  }
])