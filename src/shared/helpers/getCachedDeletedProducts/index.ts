import { CACHED_DELETED_PRODUCTS } from '../../const/const'

export const getCachedDeletedProducts = () => {
	const cachedProducts = JSON.parse(
		localStorage.getItem(CACHED_DELETED_PRODUCTS) as string
	)
	return cachedProducts
}
