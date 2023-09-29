import { useQuery } from 'react-query'
import productService from '../../../entities/productService/product.service'

export const useProducts = (selectedCategory: string | null) => {
	return useQuery({
		queryKey: ['products', selectedCategory],
		queryFn: () => productService.getAllProducts(selectedCategory),

		select: ({ data }) => data,
	})
}
