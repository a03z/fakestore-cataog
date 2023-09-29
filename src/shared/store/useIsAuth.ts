import { create } from 'zustand'

type AuthState = {
	isAuth: boolean
}
type AuthActions = {
	isAuthChanged: (change: boolean) => void
}

export const useIsAuth = create<AuthState & AuthActions>((set) => ({
	isAuth: false,
	isAuthChanged: (change) => set(() => ({ isAuth: change })),
}))
