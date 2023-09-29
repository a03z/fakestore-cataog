import { useQuery } from 'react-query'
import productService from '../../../entities/productService/product.service'

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: () => productService.getCategories(),
		select: ({ data }) => data,
	})
}
