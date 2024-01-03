import React from 'react';

const LeftNav = () =>
{
	const menu = [
		{
			id: "l1",
			text: "Link1",
			url: "#l1"
		},
		{
			id: "l2",
			text: "Link 2",
			url: "#l2"
		},
		{
			id: "l3",
			text: "Link-3",
			url: "#l3"
		},
	];

	
	return (
		<ul className="nav flex-column">
			{menu.map ((item) => {
				return (<li id={"li-"+item.id} key={"li-"+item.id} className="nav-item">
					<a id={"atag-"+item.id} className="nav-link" href={item.url}>{item.text}</a>
				</li>)
			})}
		</ul>
	);
}

export default LeftNav;
