import axios from 'axios'
import { API_URL } from '../../shared/const/const'
import { Product } from './productModel'

class ProductService {
	async getAllProducts(selectedCategory: string | null) {
		if (!selectedCategory) {
			return axios.get(API_URL + 'products')
		}
		return axios.get(API_URL + 'products/category/' + selectedCategory)
	}

	async getProduct(productId: string | number) {
		return axios.get<never, { data: Product }>(
			API_URL + 'products/' + productId
		)
	}

	async getCategories() {
		return axios.get(API_URL + 'products/categories')
	}

	async postProduct(productData: Product) {
		return axios.post(API_URL + 'products', productData)
	}

	async putProduct({ productData, productId }) {
		return axios.put(API_URL + `products/${productId}`, productData)
	}
	async deleteProduct(productId) {
		return axios.delete(API_URL + `products/${productId}`)
	}
}

export default new ProductService()
