import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './Components/Pages/Shared/Footer/Footer';
import NavBar from './Components/Pages/Shared/NavBar/NavBar';

function App() {
	const location = useLocation();
	console.log(location);
	const noHeaderFooter =
		location.pathname.includes('login') ||
		location.pathname.includes('register');
	return (
		<>
			{noHeaderFooter || <NavBar />}
			<Outlet />
			{noHeaderFooter || <Footer />}
		</>
	);
}

export default App;
