import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import Category from '../Categoty/Category';
import Featured from '../Featured/Featured';
import PopularMenu from '../PopularMenu/PopularMenu';
import TestiMonials from '../Testimonials/TestiMonials';

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Home</title>
			</Helmet>
			<Banner />
			<Category />
			<PopularMenu />
			<Featured />
			<TestiMonials />
		</div>
	);
};

export default Home;
