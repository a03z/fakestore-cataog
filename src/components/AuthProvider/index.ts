import { useCookies } from 'react-cookie'
import { useIsAuth } from '../../shared/store/useIsAuth'
import { useEffect } from 'react'
import { TOKEN_COOKIE } from '../../shared/const/const'
export const AuthProvider = ({ children }) => {
	const [cookies] = useCookies([TOKEN_COOKIE])
	const { isAuthChanged } = useIsAuth()
	useEffect(() => {
		if (cookies && cookies['TOKEN_COOKIE']?.length > 0) {
			isAuthChanged(true)
		}
	}, [])

	return children
}
