import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoadingIcon } from '../../components/Icons/LoadingIcon'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Grid,
	Image,
	Text,
	Link as ChakraLink,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { StarIcon } from '../../components/Icons/StarIcon'
import { useProduct } from '../../shared/hooks/useProduct'
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter'
import { useIsAuth } from '../../shared/store/useIsAuth'
import { ProductModal } from '../../components/ProductModal'
import { getCachedProducts } from '../../shared/helpers/getCachedProducts'
import { DeleteProductModal } from '../../components/DeleteProductModal'

export const Product = () => {
	const navigate = useNavigate()
	const { productId } = useParams()
	const toast = useToast()
	const {
		isOpen: isEditOpen,
		onClose: onCloseEdit,
		onOpen: onOpenEdit,
	} = useDisclosure()
	const {
		isOpen: isDeleteOpen,
		onClose: onCloseDelete,
		onOpen: onOpenDelete,
	} = useDisclosure()
	const { isAuth } = useIsAuth()

	const { data: product, isLoading } = useProduct(productId ? productId : '')
	const cachedProduct = getCachedProducts()?.find((p) => p.id == productId)

	if (isLoading) {
		return <LoadingIcon />
	}
	return (
		<Flex align='center' justify={'center'}>
			<Card maxH={['100%', '100%', '35rem']} h='100%' maxW='82rem'>
				<CardHeader>
					<Grid
						gridTemplateRows={['1fr 1fr', '1fr']}
						gridTemplateColumns={['1fr', '5fr 1fr']}
						alignItems={'center'}>
						<Text fontSize='2xl'>
							{cachedProduct?.title || product?.title}
						</Text>
						<Flex
							w='100%'
							justify={'space-around'}
							align={'center'}>
							<Flex align='center'>
								<StarIcon />
								<Text fontWeight={'500'} fontSize='2xl'>
									{product?.rating ? product?.rating.rate : 0}
								</Text>
								<Text alignSelf={'start'} fontSize='md'>
									{product?.rating
										? product?.rating.count
										: 0}
								</Text>
							</Flex>
						</Flex>
					</Grid>
				</CardHeader>
				<CardBody>
					<Flex
						align={['center', null, 'unset']}
						direction={['column', null, 'row']}
						gap='4rem'>
						<Image
							maxH={'20rem'}
							src={cachedProduct?.image || product?.image}
						/>
						<Flex direction={'column'} gap='2rem'>
							<ChakraLink
								color='teal.500'
								as={Link}
								to={`/?category=${
									cachedProduct?.category || product?.category
								}`}>
								{product?.category ||
									capitalizeFirstLetter(
										cachedProduct?.category ||
											product?.category
									)}
							</ChakraLink>
							<Text>
								{cachedProduct?.description ||
									product?.description}
							</Text>
						</Flex>
					</Flex>
				</CardBody>
				<CardFooter>
					<Flex
						w='100%'
						gap='3rem'
						align='center'
						justify={'flex-end'}>
						<Text fontSize={'2xl'} fontWeight={'600'}>
							${cachedProduct?.price || product?.price}
						</Text>

						{isAuth && (
							<>
								<Button
									onClick={onOpenDelete}
									fontSize={'xl'}
									size='lg'
									colorScheme='red'>
									Delete this product
								</Button>
								<Button
									onClick={onOpenEdit}
									fontSize={'xl'}
									size='lg'
									colorScheme='teal'>
									Edit this product
								</Button>
							</>
						)}
						<Button
							fontSize={'xl'}
							size='lg'
							w='8rem'
							colorScheme='teal'
							variant='outline'
							onClick={() => {
								toast({
									title: 'Currently unavailable.',
									status: 'error',
									duration: 1000,
									isClosable: true,
									position: 'top-right',
								})
							}}>
							Buy
						</Button>
					</Flex>
				</CardFooter>
			</Card>
			{isAuth && (
				<>
					<ProductModal
						defaultProductData={
							cachedProduct && Object.keys(cachedProduct).length
								? cachedProduct
								: product
						}
						onClose={onCloseEdit}
						isOpen={isEditOpen}
					/>

					<DeleteProductModal
						navigate={navigate}
						isOpen={isDeleteOpen}
						onClose={onCloseDelete}
						productId={productId}
					/>
				</>
			)}
		</Flex>
	)
}
