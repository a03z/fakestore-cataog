import { Link, useNavigate } from 'react-router-dom'
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useIsAuth } from '../../../shared/store/useIsAuth'
import { ProductModal } from '../../ProductModal'
import { useCookies } from 'react-cookie'
import { TOKEN_COOKIE } from '../../../shared/const/const'

export const Header = () => {
	const navigate = useNavigate()
	const [__, _, removeCookie] = useCookies([TOKEN_COOKIE])
	const { isAuth, isAuthChanged } = useIsAuth()
	const { isOpen, onClose, onOpen } = useDisclosure()

	const logOut = () => {
		removeCookie(TOKEN_COOKIE)
		isAuthChanged(false)
	}
	return (
		<header>
			<Flex w='100%' h='100%' align='center' justify='space-between'>
				<Link className='logoLink' to='/'>
					<Text fontSize={['xl', '3xl']}>Products</Text>
				</Link>

				{!isAuth ? (
					<Flex gap='4'>
						<Button
							colorScheme='teal'
							onClick={() => {
								navigate('/login')
							}}>
							Log in
						</Button>
						<Button
							colorScheme='teal'
							variant='outline'
							onClick={() => {
								navigate('/register')
							}}>
							Register
						</Button>
					</Flex>
				) : (
					<Flex gap='8'>
						<Button
							colorScheme='teal'
							onClick={() => {
								onOpen()
							}}>
							Create a new product
						</Button>
						<Button
							variant='outline'
							colorScheme='teal'
							onClick={logOut}>
							Log Out
						</Button>
					</Flex>
				)}
				<ProductModal isOpen={isOpen} onClose={onClose} />
			</Flex>
		</header>
	)
}
