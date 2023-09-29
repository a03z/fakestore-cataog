import { useMutation } from 'react-query'
import productService from '../../../entities/productService/product.service'
import { Product } from '../../../entities/productService/productModel'

export const usePostProduct = () => {
	return useMutation({
		mutationFn: (productData: Product) =>
			productService.postProduct(productData),
	})
}
