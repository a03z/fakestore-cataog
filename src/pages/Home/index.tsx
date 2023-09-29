import { useState, useEffect } from 'react'
import { LoadingIcon } from '../../components/Icons/LoadingIcon'
import { Product } from '../../entities/productService/productModel'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StarIcon } from '../../components/Icons/StarIcon'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Flex,
	Grid,
	Text,
	Select,
} from '@chakra-ui/react'
import { useProducts } from '../../shared/hooks/useProducts'
import { useCategories } from '../../shared/hooks/useCategories'
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter'
import { getCachedProducts } from '../../shared/helpers/getCachedProducts'
import { getCachedDeletedProducts } from '../../shared/helpers/getCachedDeletedProducts'

export const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [currentCategory, setCurrentCategory] = useState<string | null>(
		searchParams.get('category')
	)
	const { isLoading, data: products, refetch } = useProducts(currentCategory)
	const { data: categories } = useCategories()
	const cachedProducts = getCachedProducts()
	const cachedDeletedProducts = getCachedDeletedProducts()

	let productsArr = products

	if (cachedDeletedProducts?.length && !cachedProducts?.length) {
		productsArr = products?.filter(
			(product) => cachedDeletedProducts?.indexOf(product.id) < 0
		)
	}
	if (cachedProducts?.length && !cachedDeletedProducts?.length) {
		productsArr = products?.map((product) => {
			// функция замены товаров из респонса на кэшированные товары
			const intersectingProduct = cachedProducts?.find(
				(cachedProduct) => cachedProduct.id === product.id // ищем в кэшированных товар с таким же айди
			)
			if (intersectingProduct)
				return {
					...intersectingProduct,
					rating: product.rating,
				} // если есть, то
			return product
		})
	}
	if (cachedProducts?.length && cachedDeletedProducts?.length) {
		productsArr = products
			?.filter(
				(product) => cachedDeletedProducts?.indexOf(product.id) < 0
			)
			?.map((product) => {
				// функция замены товаров из респонса на кэшированные товары
				const intersectingProduct = cachedProducts?.find(
					(cachedProduct) => cachedProduct.id === product.id // ищем в кэшированных товар с таким же айди
				)
				if (intersectingProduct)
					return {
						...intersectingProduct,
						rating: product.rating,
					} // если есть, то
				return product
			})
	}

	const productsArrIds = new Set(productsArr?.map((p) => p.id))
	const mergedProducts =
		productsArr && cachedProducts
			? [
					...productsArr,
					...cachedProducts.filter((p) => !productsArrIds?.has(p.id)),
			  ]
			: productsArr

	useEffect(() => {
		refetch()
	}, [currentCategory, refetch])
	if (isLoading) {
		return <LoadingIcon />
	}

	return (
		<Flex padding={[0, null, '3rem']} direction={'column'} gap='4'>
			<Select
				border='2px solid white'
				onChange={(event) => {
					setCurrentCategory(event.target.value)
					searchParams.set('category', event.target.value)
					setSearchParams(searchParams)
				}}
				defaultValue={currentCategory ? currentCategory : undefined}
				alignSelf={'end'}
				maxW={'12rem'}
				fontFamily={'Montserrat'}
				placeholder='All'>
				{categories?.map((category: string) => {
					return (
						<option key={category} value={category}>
							{capitalizeFirstLetter(category)}
						</option>
					)
				})}
			</Select>
			<Flex justify={'center'} wrap='wrap' gap='8'>
				{mergedProducts
					?.filter((mp) =>
						currentCategory && currentCategory?.length > 0
							? mp?.category === currentCategory
							: true
					)
					?.map((product: Product) => {
						return (
							<Card
								style={{ cursor: 'pointer' }}
								maxW='sm'
								maxH='28rem'
								width={'100%'}
								onClick={() => {
									navigate(`/product/${product.id}`)
								}}
								key={product.id}>
								<Grid
									placeItems={'center'}
									gridTemplateRows={'150px 1fr 75px'}>
									<CardHeader>
										<Text fontSize='xl' align={'center'}>
											{product.title}
										</Text>
									</CardHeader>
									<CardBody>
										<Image
											maxH='12rem'
											src={product.image}
											alt={product.title}
										/>
									</CardBody>
									<CardFooter w='100%'>
										<Flex
											w='100%'
											justify={'space-around'}
											align={'center'}>
											<Flex align='center'>
												<StarIcon />
												<Text
													fontWeight={'500'}
													fontSize='lg'>
													{product?.rating
														? product.rating.rate
														: 0}
												</Text>
												<Text
													alignSelf={'start'}
													fontSize='xs'>
													{product?.rating
														? product.rating.count
														: 0}
												</Text>
											</Flex>
											<Text
												fontWeight={'500'}
												fontSize='lg'>
												${product.price}
											</Text>
										</Flex>
									</CardFooter>
								</Grid>
							</Card>
						)
					})}
			</Flex>
		</Flex>
	)
}
