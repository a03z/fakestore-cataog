import './styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import './styles/App.scss'
import { Login } from './pages/Login'
import { Product } from './pages/Product'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/product/:productId' element={<Product />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
