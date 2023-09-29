import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Grid,
	Input,
	Text,
	Link as ChakraLink,
	FormLabel,
	FormControl,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useIsAuth } from '../../shared/store/useIsAuth'
import { useCookies } from 'react-cookie'
import { LoginSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { TOKEN_COOKIE } from '../../shared/const/const'

export const Login = () => {
	const navigate = useNavigate()
	const [_, setCookie] = useCookies([TOKEN_COOKIE])
	const [showPassword, setShowPassword] = useState(false)
	const { isAuthChanged } = useIsAuth()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LoginSchema),
		mode: 'onChange',
	})
	const [loginError, setLoginError] = useState('')

	const onSubmit = async (formData: { [key: string]: string }) => {
		const registeredUser = JSON.parse(
			localStorage.getItem('registeredUser') as string
		)

		if (
			registeredUser?.username === formData.username &&
			registeredUser?.password === formData.password
		) {
			const { data } = await axios.post(
				'https://fakestoreapi.com/auth/login',
				{
					username: 'mor_2314',
					password: '83r5^_',
				}
			)
			setCookie(TOKEN_COOKIE, data.token)
			navigate('/')
			isAuthChanged(true)
		} else {
			setLoginError('User not found')
		}
	}
	return (
		<Grid placeItems={'center'} h='100%' w='100%'>
			<Card maxW='30rem'>
				<CardHeader>
					<Text align='center'>
						Authenticate to get access to new features
					</Text>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex align={'center'} direction={'column'} gap='8'>
							<FormControl
								isInvalid={!!errors['username']}
								id='username'
								variant='floating'>
								<Input {...register('username')} />
								<FormLabel>Username</FormLabel>
							</FormControl>
							<FormControl
								isInvalid={!!errors['password']}
								id='password'
								variant='floating'>
								<InputGroup>
									<Input
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('password')}
									/>
									<FormLabel>Password</FormLabel>
									<InputRightElement width='4.5rem'>
										<Button
											h='1.75rem'
											size='sm'
											onClick={() => {
												setShowPassword((show) => !show)
											}}>
											{!showPassword ? (
												<ViewIcon />
											) : (
												<ViewOffIcon />
											)}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Button maxW='12rem' type='submit' color={'teal'}>
								Log in
							</Button>
						</Flex>
					</form>
					{loginError && (
						<Text mt='1rem' align='center' color='red.500'>
							{loginError}
						</Text>
					)}
				</CardBody>
				<CardFooter>
					<ChakraLink
						w='100%'
						textAlign='center'
						color='teal.600'
						pt='0'
						to='/register'
						as={Link}>
						Don't have an account? Register
					</ChakraLink>
				</CardFooter>
			</Card>
		</Grid>
	)
}
