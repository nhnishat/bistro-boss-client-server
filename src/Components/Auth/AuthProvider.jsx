import axios from 'axios';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const auth = getAuth(app);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState('');
	const googleProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// useEffect(() => {
	// 	const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
	// 		setUser(currentUser);
	// 		// Get and set token
	// 		if (currentUser) {
	// 			axios
	// 				.post('http://localhost:5000/jwt', { email: currentUser.email })
	// 				.then((data) => {
	// 					console.log(data);
	// 					console.log(data.data);
	// 					localStorage.setItem('access-token', data.data);
	// 				});
	// 		} else {
	// 			localStorage.removeItem('access-token');
	// 		}
	// 		setLoading(false);
	// 		console.log('current user', currentUser);
	// 	});
	// 	return unSubscribe();
	// });

	const singInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};
	const googleSingIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			console.log('current user', currentUser);

			// get and set token
			if (currentUser) {
				axios
					.post('http://localhost:5000/jwt', {
						email: currentUser.email,
					})
					.then((data) => {
						// console.log(data.data.token)
						localStorage.setItem('access-token', data.data);
						setLoading(false);
					});
			} else {
				localStorage.removeItem('access-token');
			}
		});
		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		singInUser,
		logOut,
		createUser,
		updateUserProfile,
		googleSingIn,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
