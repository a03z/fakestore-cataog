import { useMutation } from 'react-query'
import productService from '../../../entities/productService/product.service'
import { Product } from '../../../entities/productService/productModel'

export const usePutProduct = () => {
	return useMutation({
		mutationFn: ({
			productData,
			productId,
		}: {
			productData: Product
			productId?: string
		}) => productService.putProduct({ productData, productId }),
	})
}
