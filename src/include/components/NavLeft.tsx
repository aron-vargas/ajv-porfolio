import React from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";

export interface LeftNavType
{
    id: string,
    text: string,
    className?: string,
    href?: string,
    to?: string
};

const defaultMenu = [
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

const LeftNav = (propMenu: [LeftNavType]) =>
{
    // Use default if missing
    let menu = (propMenu.length) ? propMenu : defaultMenu;

	return (
		<ul className="nav flex-column">
			{menu.map ((item: LeftNavType) => {
				return (
                    <li id={"li-"+item.id} key={"li-"+item.id} className="nav-item">
					{(item.href && <a id={"atag-"+item.id} className="nav-link" href={item.href}>{item.text}</a>)}
                    {(item.to && <Link id={"link-"+item.id} to={item.to}>{item.text}</Link>)}
				    </li>
                )
			})}
		</ul>
	);
}

export default LeftNav;
