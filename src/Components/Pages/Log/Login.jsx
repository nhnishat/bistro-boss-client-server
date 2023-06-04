import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	LoadCanvasTemplate,
	loadCaptchaEnginge,
	validateCaptcha,
} from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider';
import SocialLogIn from '../Shared/SocialLogIn/SocialLogIn';

const Login = () => {
	const { singInUser } = useContext(AuthContext);
	const [disable, setDisable] = useState(true);
	let navigate = useNavigate();
	let location = useLocation();
	const from = location.state?.from?.pathname || '/';
	useEffect(() => {
		loadCaptchaEnginge(6);
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
		singInUser(email, password)
			.then((Result) => {
				const loggedUser = Result.user;
				console.log(loggedUser);

				Swal.fire({
					title: 'User Login successfully',
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				});
				navigate(from, { replace: true });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleValidate = (event) => {
		const user_captcha_value = event.target.value;
		console.log(user_captcha_value);

		if (validateCaptcha(user_captcha_value)) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

	return (
		<>
			<Helmet>
				<title>Bistro Boss | Login</title>
			</Helmet>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row">
					<div className="text-center md:w-1/2 lg:text-left">
						<h1 className="text-5xl font-bold">Login now!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
						</p>
					</div>
					<div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
						<form onSubmit={handleLogin} className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									name="email"
									placeholder="email"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									name="password"
									placeholder="password"
									className="input input-bordered"
								/>
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">
										Forgot password?
									</a>
								</label>
							</div>
							<div className="form-control">
								<label className="label">
									<LoadCanvasTemplate />
								</label>
								<input
									type="text"
									name="captcha"
									onBlur={handleValidate}
									placeholder="captcha"
									className="input input-bordered"
								/>
							</div>
							{/* TODO: make button disable for capture  */}
							<div className="form-control mt-6">
								<input
									disabled={false}
									type="submit"
									value="Sing in"
									className="btn btn-primary"
								/>
							</div>
							<p className="text-center">
								<small>
									New Here?{' '}
									<Link to="/register" className="text-orange-500 underline">
										Create an account
									</Link>
								</small>
							</p>
							<SocialLogIn />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
