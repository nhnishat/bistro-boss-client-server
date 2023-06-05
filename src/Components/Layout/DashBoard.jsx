import {
	FaBook,
	FaCalendarAlt,
	FaHome,
	FaShoppingCart,
	FaUsers,
	FaUtensils,
	FaWallet,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useCart from '../../Hooks/useCart';

const DashBoard = () => {
	const [cart] = useCart();
	// TODO
	// const isAdmin= true;
	const isAdmin = useAdmin();
	return (
		<div className="drawer drawer-mobile">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* <!-- Page content here --> */}
				<Outlet />
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side bg-[#d1a054]">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 text-base-content">
					{/* <!-- Sidebar content here --> */}
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/home">
									<FaHome />
									Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/additem">
									<FaUtensils />
									Add Item
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/manage">
									<FaWallet />
									Manage Items
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/booking">
									<FaBook />
									Manage Bookings
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/allusers">
									<FaUsers />
									All Users
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/dashboard/home">
									<FaHome />
									User Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reservations">
									<FaCalendarAlt />
									Reservations
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/history">
									<FaWallet />
									Payment History
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/mycart">
									<FaShoppingCart />
									MyCart
									<div className="badge badge-secondary">
										{cart?.length || 0}
									</div>
								</NavLink>
							</li>
						</>
					)}

					<div className="divider"></div>

					<li>
						<NavLink to="/">
							<FaHome />
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/menu"> Menu</NavLink>
					</li>
					<li>
						<NavLink to="/order/salad">Order Food</NavLink>
					</li>
					<li>
						<NavLink></NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DashBoard;
