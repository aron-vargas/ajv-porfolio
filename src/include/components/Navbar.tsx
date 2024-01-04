import logo from "include/images/NVPrimeLogo.png";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
//import { useState } from 'react';

const NavItem = ({ item, submenu }: { item: any; submenu: any }) => {
  if (submenu)
    return (
      <li className="nav-item dropdown">
        <a key={"atag-" + item.id} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
          {item.text}
        </a>
        {submenu}
      </li>
    );
  else
    return (
      <li className="nav-item">
        <a key={"atag-" + item.id} className="nav-link" href={item.href}>
          {item.text}
        </a>
      </li>
    );
};

const NavMenu = ({ menu, navlevel }: { menu: any; navlevel: string }) =>
{
    const NavList = menu.map((MenuObj: any) =>
    {
        //we then create a ul with children/null, by self invoking UlTreeBuilder
        let ItemSubMenu = MenuObj.submenu ? (<NavMenu menu={MenuObj.submenu} navlevel="dropdown-menu" key={"msub-" + MenuObj.id} />) : ("");

        // Then add this created ul into a new li
        return (<NavItem item={MenuObj} submenu={ItemSubMenu} key={"mitm-" + MenuObj.id} />);
    });

  return (
    <ul key="my-ul" className={navlevel}>
      {NavList}
    </ul>
  );
};

// Create a type for NavItem so that this can be used by other components later with data integrity
export interface NavItemType {
  id: string;
  text: string;
  href?: string;
  submenu?: [NavItemType];
}

const NavBar = (menu: NavItemType[]) =>
{
  return (
    <nav id="top-navbar" className="navbar navbar-default navbar-expand-sm bg-light navbar-light sticky-top">
      <a className="navbar-brand" href="#top-navbar">
        <img src={logo} className="top-logo" alt="Nevada Prime Logo" />
      </a>
      <NavMenu menu={menu} navlevel="navbar-nav" key="manin-nav" />
      <div data-content-block-name="Login Button" className="d-none nav-buttons d-lg-inline-block d-flex">
        <button type="button" className="btn btn-secondary">
          Log In
        </button>
        &nbsp;
        <button type="button" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;