import { Grid, Spinner } from '@chakra-ui/react'

export const LoadingIcon = ({ size }: { size?: string }) => {
	return (
		<Grid w='100%' h='100%' placeItems='center'>
			<Spinner
				thickness='4px'
				speed='0.5s'
				emptyColor='gray.200'
				color='teal.500'
				size={size || 'xl'}
			/>
		</Grid>
	)
}
