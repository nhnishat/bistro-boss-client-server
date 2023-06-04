import { Helmet } from 'react-helmet';
import UseMenu from '../../../../Hooks/UseMenu';
import menuImg from '../../../../assets/menu/banner3.jpg';
import dessertImg from '../../../../assets/menu/dessert-bg.jpeg';
import PizzaImg from '../../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../../assets/menu/soup-bg.jpg';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import Cover from '../../Shared/Cover/Cover';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
	const [menu] = UseMenu();
	const dessert = menu.filter((item) => item.category === 'dessert');
	const pizza = menu.filter((item) => item.category === 'pizza');
	const salad = menu.filter((item) => item.category === 'salad');
	const soup = menu.filter((item) => item.category === 'soup');
	const offered = menu.filter((item) => item.category === 'offered');
	return (
		<div>
			<Helmet>
				<title>Bistro Boss | Menu</title>
			</Helmet>
			{/* main cover */}
			<Cover img={menuImg} title="Our menu"></Cover>
			<SectionTitle subheading="Don't miss" heading="Today Offered" />
			{/* offered menu items */}
			<MenuCategory items={offered} />
			{/* dessert menu item */}
			<MenuCategory items={dessert} title="dessert" img={dessertImg} />
			<MenuCategory items={pizza} title="pizza" img={PizzaImg} />
			<MenuCategory items={salad} title="salad" img={saladImg} />
			<MenuCategory items={soup} title="soup" img={soupImg} />
		</div>
	);
};

export default Menu;
