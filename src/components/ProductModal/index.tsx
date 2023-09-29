import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Textarea,
} from '@chakra-ui/react'
import { Product } from '../../entities/productService/productModel'
import { useForm } from 'react-hook-form'
import { productFields } from './const'
import { LoadingIcon } from '../Icons/LoadingIcon'
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter'
import { useCategories } from '../../shared/hooks/useCategories'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductSchema } from './schema'
import { usePostProduct } from '../../shared/hooks/usePostProduct'
import { CACHED_PRODUCTS } from '../../shared/const/const'
import { usePutProduct } from '../../shared/hooks/usePutProduct'
import { useParams } from 'react-router-dom'
import { getCachedProducts } from '../../shared/helpers/getCachedProducts'

export const ProductModal = ({
	defaultProductData,
	isOpen,
	onClose,
}: {
	defaultProductData?: Product
	isOpen: boolean
	onClose: () => void
}) => {
	const { isLoading, data: categories } = useCategories()
	const { mutateAsync: postProduct } = usePostProduct()
	const { mutateAsync: putProduct } = usePutProduct()
	const { productId } = useParams()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ProductSchema),
		mode: 'onChange',
	})

	const submitProduct = async (fieldsData: unknown) => {
		if (!(defaultProductData && Object.keys(defaultProductData).length)) {
			// если не редактирование товара, то создаем новый запросом
			const { data: postProductData } = await postProduct(
				fieldsData as Product
			)
			const cachedProducts = getCachedProducts() // получаем закэшированные товары
			if (cachedProducts?.length) {
				const updatedCachedProducts = cachedProducts // если кэшированные товары есть, пушим туда только что созданный товар
				updatedCachedProducts.push(postProductData)
				localStorage.setItem(
					CACHED_PRODUCTS,
					JSON.stringify(updatedCachedProducts)
				) // кэшируем обновленный список обновленных товаров
			} else {
				localStorage.setItem(
					CACHED_PRODUCTS,
					JSON.stringify([postProductData])
				) // если кэшированных товаров нет, то создаем массив и суем туда респонс с запроса
			}
		} else {
			// если идет редактирование товара
			const { data: putProductData } = await putProduct({
				productData: fieldsData as Product,
				productId,
			})
			const cachedProducts = getCachedProducts()
			if (cachedProducts?.length) {
				// та же логика что и в предыдущем условии
				const foundCachedProduct = cachedProducts.find(
					(product) => product.id === putProductData.id
				) // среди кэшированных товаров ищем товар с таким же айди
				if (foundCachedProduct) {
					const updatedCachedProducts = cachedProducts.filter(
						(product) => product.id !== foundCachedProduct.id
					) // если товар найден, то убираем его из кэшированных
					updatedCachedProducts.push(putProductData) // и пушим его в обновленный массив кэшированных
					localStorage.setItem(
						CACHED_PRODUCTS,
						JSON.stringify(updatedCachedProducts)
					)
				} else {
					cachedProducts.push(putProductData) // если закэшированный товар с таким же айди не найден, то просто пушим его в массив
					localStorage.setItem(
						CACHED_PRODUCTS,
						JSON.stringify(cachedProducts)
					)
				}
			} else {
				localStorage.setItem(
					CACHED_PRODUCTS,
					JSON.stringify([putProductData])
				) // если кэшированных товаров нет, то создаем массив и сохраняем его
			}
		}
		onClose()
	}

	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{defaultProductData?.title
						? 'Edit this product'
						: 'Create a new product'}
				</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(submitProduct)}>
					<ModalBody>
						{productFields.map((field) => {
							return (
								<FormControl
									key={field.id}
									my='1rem'
									isInvalid={!!errors[field.id]}
									id={field.id}
									variant='floating'>
									<Input
										defaultValue={
											defaultProductData &&
											defaultProductData[field.id]
										}
										{...register(field.id)}
									/>
									<FormErrorMessage>
										{errors[field.id] &&
											errors[field.id]?.message}
									</FormErrorMessage>
									<FormLabel>{field.text}</FormLabel>
								</FormControl>
							)
						})}

						<FormControl
							my='1rem'
							isInvalid={!!errors['description']}
							id={'description'}
							variant='floating'>
							<Textarea
								resize='none'
								defaultValue={
									defaultProductData &&
									defaultProductData['description']
								}
								{...register('description')}
							/>
							<FormErrorMessage>
								{errors['description'] &&
									errors['description']?.message}
							</FormErrorMessage>
							<FormLabel>Description</FormLabel>
						</FormControl>

						<Select
							{...register('category')}
							defaultValue={
								defaultProductData?.category
									? defaultProductData?.category
									: undefined
							}
							alignSelf={'end'}
							fontFamily={'Montserrat'}>
							{categories?.map((category: string) => {
								return (
									<option key={category} value={category}>
										{capitalizeFirstLetter(category)}
									</option>
								)
							})}
						</Select>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} variant='ghost' onClick={onClose}>
							Close
						</Button>
						<Button type='submit' colorScheme='teal'>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
