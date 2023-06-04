import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Auth/AuthProvider';

const SocialLogIn = () => {
	const { googleSingIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const handleGoogleSingIn = () => {
		googleSingIn().then((result) => {
			const loggedUser = result.user;
			console.log(loggedUser);
			const saveUser = {
				name: loggedUser.displayName,
				email: loggedUser.email,
			};
			fetch('http://localhost:5000/users', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(saveUser),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					navigate(from, { replace: true });
				});
		});
	};

	return (
		<div className="text-center">
			<div className="divider"></div>
			<button
				onClick={handleGoogleSingIn}
				className="btn btn-circle btn-outline text-center"
			>
				<FaGoogle className="text-green-500 text-2xl" />
			</button>
		</div>
	);
};

export default SocialLogIn;
