import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react'
import { useDeleteProduct } from '../../shared/hooks/useDeleteProduct'
import { LoadingIcon } from '../Icons/LoadingIcon'
import {
	CACHED_DELETED_PRODUCTS,
	CACHED_PRODUCTS,
} from '../../shared/const/const'
import { getCachedDeletedProducts } from '../../shared/helpers/getCachedDeletedProducts'
import { getCachedProducts } from '../../shared/helpers/getCachedProducts'

export const DeleteProductModal = ({
	isOpen,
	onClose,
	productId,
	navigate,
}) => {
	const { isLoading, mutateAsync: deleteProduct } = useDeleteProduct()

	const onConfirm = async () => {
		const { data } = await deleteProduct(productId)
		const cachedDeletedProducts = getCachedDeletedProducts()
		const cachedProducts = getCachedProducts()
		if (data) {
			if (cachedProducts?.length) {
				localStorage.setItem(
					CACHED_PRODUCTS,
					JSON.stringify(
						cachedProducts.filter(
							(product) => product.id != data.id
						)
					)
				)
			}
			if (!cachedDeletedProducts?.length) {
				localStorage.setItem(
					CACHED_DELETED_PRODUCTS,
					JSON.stringify([data.id])
				)
			} else {
				cachedDeletedProducts.push(data.id)
				localStorage.setItem(
					CACHED_DELETED_PRODUCTS,
					JSON.stringify(cachedDeletedProducts)
				)
			}
		}
		if (!data && cachedProducts?.length) {
			localStorage.setItem(
				CACHED_PRODUCTS,
				JSON.stringify(
					cachedProducts.filter((product) => product.id != productId)
				)
			)
		}

		onClose()
		navigate('/')
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Text align={'center'} p='0.5rem' fontSize='1.5rem'>
						Are you sure you want to delete this product?
					</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text fontSize='1.25rem'>
						Please confirm your action by clicking button below
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button mr={3} variant='ghost' onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={onConfirm}
						w='8rem'
						type='submit'
						colorScheme='red'>
						{!isLoading ? 'Confirm' : <LoadingIcon size='lg' />}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
