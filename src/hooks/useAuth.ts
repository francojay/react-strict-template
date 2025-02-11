import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { routeEnum } from '../routes'
import { api } from '../util/api'

interface LoginCredentials {
    username: string
    password: string
}

interface AuthResponse {
    token: string
}

export const useAuth = () => {
    const navigate = useNavigate()

    const { mutate: login, isPending: isLoading, error } = useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            api.post<AuthResponse>('/auth/login', credentials),
        onSuccess: (data: AuthResponse) => {
            localStorage.setItem('token', data.token)
            navigate(routeEnum.HOME)
        },
    })

    return {
        login,
        logout: () => {
            localStorage.removeItem('token')
            navigate(routeEnum.LOGIN)
        },
        loading: isLoading,
        error: error?.message,
        isAuthenticated: Boolean(localStorage.getItem('token'))
    }
}