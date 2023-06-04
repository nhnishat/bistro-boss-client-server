import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
	const { data: users = [], refetch } = useQuery(['users'], async () => {
		const res = await fetch('http://localhost:5000/users');
		return res.json();
	});
	const handleDeletedUser = (user) => {
		console.log(user);
	};

	const handleMakeAdmin = (user) => {
		console.log(user._id);
		fetch(`http://localhost:5000/users/admin/${user._id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					refetch();
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `${user.name} is an admin Now`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
	return (
		<div className="">
			<Helmet>
				<title>Bistro | All Users</title>
			</Helmet>
			<h1 className="text-3xl font-semibold my-4">{users.length}</h1>

			<div className="overflow-x-auto ">
				<table className="table table-zebra">
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* <!-- row 1 --> */}
						{users.map((user, index) => (
							<tr key={user._id}>
								<th>{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.role === 'admin' ? (
										'admin'
									) : (
										<button
											onClick={() => handleMakeAdmin(user)}
											className="btn btn-ghost bg-orange-500 text-white font-[20px]"
										>
											<FaUserShield />
										</button>
									)}
								</td>
								<td>
									<button
										onClick={() => handleDeletedUser(user)}
										className="btn btn-ghost bg-red-500 text-white font-[20px]"
									>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
