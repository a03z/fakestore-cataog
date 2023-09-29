import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Grid } from '@chakra-ui/react'

export const Layout = () => {
	return (
		<>
			<Grid
				backgroundColor={'beige'}
				minH='100vh'
				h='100%'
				p='0 2rem'
				gridTemplateRows={'4rem 1fr'}>
				<Header />
				<Outlet />
			</Grid>
		</>
	)
}
