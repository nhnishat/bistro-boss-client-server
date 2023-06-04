import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import DashBoard from '../Layout/DashBoard';
import AllUsers from '../Pages/AllUsers/AllUsers';
import MyCart from '../Pages/Dashboard/MyCart/MyCart';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Log/Login';
import Menu from '../Pages/Menu/Menu/Menu';
import Order from '../Pages/OrderFood/Order/Order';
import Register from '../Pages/Register/Register';
import Secret from '../Pages/Shared/Secret/Secret';
import PrivateRoute from './Private/PrivateRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'menu',
				element: <Menu />,
			},
			{
				path: 'order/:category',
				element: <Order />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'secret',
				element: (
					<PrivateRoute>
						<Secret />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<PrivateRoute>
				<DashBoard />
			</PrivateRoute>
		),
		children: [
			{
				path: 'mycart',
				element: <MyCart />,
			},
			{
				path: 'allusers',
				element: <AllUsers />,
			},
		],
	},
]);
