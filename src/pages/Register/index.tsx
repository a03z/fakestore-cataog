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
	InputGroup,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIMask } from 'react-imask'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterSchema } from './schema'
import { registerInputs } from './const'

export const Register = () => {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(RegisterSchema),
		mode: 'onChange',
	})

	const onSubmit = async (formData: unknown) => {
		localStorage.setItem('registeredUser', JSON.stringify(formData))
		navigate('/login')
	}

	const { ref } = useIMask(
		{
			mask: '{1}-000-000-0000',
		},
		{
			onAccept: (value) => {
				setValue('phone', value)
			},
		}
	)
	return (
		<Grid placeItems={'center'} h='100%' w='100%'>
			<Card maxW='40rem'>
				<CardHeader>
					<Text align='center'>
						Authenticate to get access to new features
					</Text>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex direction={'column'} align='center' gap='8'>
							{registerInputs.map((element) => {
								if (Array.isArray(element)) {
									return (
										<Flex
											key={`${element.length}${element[0].id}${element[1].id}`}
											w='100%'
											align={'center'}
											justifyContent={'space-between'}
											direction={['column', null, 'row']}
											gap='8'>
											{element.map((inputEl) => {
												if (inputEl.id === 'password') {
													return (
														<FormControl
															isInvalid={
																!!errors[
																	inputEl.id
																]
															}
															key={inputEl.id}
															id='password'
															variant='floating'>
															<InputGroup>
																<Input
																	type={
																		showPassword
																			? 'text'
																			: 'password'
																	}
																	{...register(
																		'password'
																	)}
																/>
																<FormLabel>
																	Password
																</FormLabel>
																<InputRightElement width='4.5rem'>
																	<Button
																		h='1.75rem'
																		size='sm'
																		background={
																			'none'
																		}
																		onClick={() => {
																			setShowPassword(
																				(
																					show
																				) =>
																					!show
																			)
																		}}>
																		{!showPassword ? (
																			<ViewIcon />
																		) : (
																			<ViewOffIcon />
																		)}
																	</Button>
																</InputRightElement>
															</InputGroup>

															<FormErrorMessage>
																{errors[
																	inputEl.id
																] &&
																	errors[
																		inputEl
																			.id
																	]?.message}
															</FormErrorMessage>
														</FormControl>
													)
												}
												return (
													<FormControl
														isInvalid={
															inputEl.group
																? errors[
																		inputEl
																			.group
																  ] &&
																  !!errors[
																		inputEl
																			.group
																  ][inputEl.id]
																: !!errors[
																		inputEl
																			.id
																  ]
														}
														key={inputEl.id}
														id={inputEl.id}
														variant='floating'>
														<Input
															{...register(
																inputEl.group
																	? `${inputEl.group}.${inputEl.id}`
																	: (inputEl.id as any)
															)}
														/>
														<FormErrorMessage>
															{inputEl.group
																? errors[
																		inputEl
																			.group
																  ] &&
																  errors[
																		inputEl
																			.group
																  ][inputEl.id]
																		?.message
																: errors[
																		inputEl
																			.id
																  ]?.message}
														</FormErrorMessage>
														<FormLabel>
															{inputEl.text}
														</FormLabel>
													</FormControl>
												)
											})}
										</Flex>
									)
								}
								return (
									<FormControl
										isInvalid={!!errors[element.id]}
										key={element.id}
										id={element.id}
										variant='floating'>
										<Input
											{...register(element.id as any)}
										/>
										<FormLabel>{element.text}</FormLabel>

										<FormErrorMessage>
											{errors[element.id] &&
												errors[element.id]?.message}
										</FormErrorMessage>
									</FormControl>
								)
							})}

							<FormControl
								isInvalid={!!errors['phone']}
								id='phone'
								variant='floating'>
								<Input
									{...register('phone')}
									ref={
										ref as React.RefObject<HTMLInputElement>
									}
								/>
								<FormLabel>Phone number</FormLabel>
								{errors['phone'] && (
									<FormErrorMessage>
										{errors['phone']?.message}
									</FormErrorMessage>
								)}
							</FormControl>
							<Button maxW='12rem' type='submit' color={'teal'}>
								Create an account
							</Button>
						</Flex>
						<></>
					</form>
				</CardBody>
				<CardFooter>
					<ChakraLink
						w='100%'
						textAlign={'center'}
						color='teal.600'
						pt='0'
						to='/login'
						as={Link}>
						Already have an account? Log in
					</ChakraLink>
				</CardFooter>
			</Card>
		</Grid>
	)
}
