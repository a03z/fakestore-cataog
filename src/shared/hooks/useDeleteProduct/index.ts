import { useMutation } from 'react-query'
import productService from '../../../entities/productService/product.service'

export const useDeleteProduct = () => {
	return useMutation({
		mutationFn: (productId) => productService.deleteProduct(productId),
	})
}
