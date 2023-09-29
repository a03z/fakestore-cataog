import { useQuery } from 'react-query'
import productService from '../../../entities/productService/product.service'

export const useProduct = (productId: string) => {
	return useQuery({
		queryKey: ['products', productId],
		queryFn: () => productService.getProduct(productId),

		select: ({ data }) => data,
	})
}
