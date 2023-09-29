import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './components/AuthProvider/index.ts'

const queryClient = new QueryClient()

export const theme = extendTheme({
	components: {
		Form: {
			variants: {
				floating: {
					container: {
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: 'absolute',
							backgroundColor: 'white',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: 'left top',
							transform: 'scale(0.85) translateY(-24px)',
						},
					},
				},
			},
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<CookiesProvider>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<App />
						</AuthProvider>
					</QueryClientProvider>
				</CookiesProvider>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
)
