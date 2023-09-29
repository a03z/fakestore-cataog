import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useIsAuth } from '../../shared/store/useIsAuth'

export const ProtectedRoute = () => {
	const { pathname } = useLocation()
	const { isAuth } = useIsAuth()
	if (isAuth) {
		if (pathname === '/login' || pathname === '/register') {
			return <Navigate to='/' />
		}
	}
	return <Outlet />
}
