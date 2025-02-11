import { lazy, Suspense } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

//test

const Login = lazy(() => import('./pages/Login/Login'))
const Home = lazy(() => import('./pages/Home/Home'))

export const routeEnum = {
    LOGIN: '/login',
    HOME: '/',
} as const

export const routes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: routeEnum.LOGIN,
                element: (
                    <Suspense fallback={<LoadingScreen />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: routeEnum.HOME,
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingScreen />}>
                            <Home />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <Navigate to={routeEnum.HOME} replace />,
            }
        ]
    }
]