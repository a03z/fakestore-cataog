import { CACHED_PRODUCTS } from '../../const/const'

export const getCachedProducts = () => {
	const cachedProducts = JSON.parse(
		localStorage.getItem(CACHED_PRODUCTS) as string
	)
	return cachedProducts
}
