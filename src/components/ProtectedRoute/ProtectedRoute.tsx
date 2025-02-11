import { type FC, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { routeEnum } from '../../routes'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={routeEnum.LOGIN} replace />
    }

    return children
}

export default ProtectedRoute