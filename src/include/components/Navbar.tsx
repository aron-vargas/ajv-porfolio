import logo from 'include/images/NVPrimeLogo.png'
import { useState } from 'react';

function NavBar ()
{
	const [id, setID] = useState("home");
  
	function navPageClick()
	{
		setID(id);
	}

	const NavPages = [
		{
			text: "Home",
			id: "home"
		},
		{
			text: "Buy",
			id: "buy"
		},
		{
			text: "Sell",
			id: "sell"
		},
		{
			text: "Rent",
			id: "rent"
		},
		{
			text: "Community",
			id: "community"
		},
		{
			text: "Resources",
			id: "resources"
		},
		{
			text: "About",
			id: "about"
		},
		{
			text: "Conact Us",
			id:  "contactus"
		},
	];

	//const navItems = NavPages.map(page =>
	//	<li key={page.id} id={page.id} className='nav-item' onClick={navPageClick}>
	//		<a className="nav-link">{page.text}</a>
	//	</li>
	//);

	const navItems = NavPages.map(page =>
		<MyItem page={page} onClick={navPageClick}/>
	);

	return (
		<nav className="navbar navbar-default navbar-expand-sm bg-light navbar-light">
			<a className='navbar-brand'>
				<img src={logo} className="top-logo" alt="Nevada Prime Logo"/>
			</a>
			<ul className='navbar-nav'>
				{navItems}
			</ul>
		</nav>
	);
}

export default NavBar;

function MyItem({ page, onClick }) {
return (
	<li key={page.id} id={page.id} className='nav-item' onClick={onClick}>
		<a className="nav-link">{page.text}</a>
	</li>
);
}