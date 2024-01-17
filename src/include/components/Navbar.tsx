import { useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown  from 'react-bootstrap/NavDropdown';
import logo from "include/images/NVPrimeLogo.png";
import { Link } from "react-router-dom";
import { useAuth, User } from 'include/components/useAuth';

// Create a type for NavItem so that this can be used by other components later with data integrity
export interface NavItemType {
    id: string;
    name: string;
    side: string;
    hidden: boolean;
    skipNav?: boolean;
    href?: string;
    to?: string;
    children?: NavItemType[];
}

/**
 * Button for login
 * @returns <HTML>
 */
export const LoginButton = () =>
{
    const auth = useAuth();

    const handleLogin = () =>
    {
        let newUser = {
            userID: 1,
            firstName: 'Aron',
            lastName: 'Vargas',
            email: 'aron@email.com',
        } as User;

        auth.login(newUser);
    };

    return (<button className="btn btn-primary mx-1" onClick={handleLogin}>Log In</button>);
};

/**
 * Button for logout
 * @returns <HTML>
 */
export const LogoutButton = () =>
{
    const { logout } = useAuth();

    return (<button className="btn btn-secondary mx-1" onClick={logout}>Log Out</button>);
};

/*
export const Profile = () => {
     return (
        <>
            <div className="container">
                <p className="userInfo" id="userInfo1">
                    Name: {user.name}</p>
                <p className="userInfo" id="userInfo2">
                    Given Name: {user.given_name}</p>
                <p className="userInfo" id="userInfo3">
                    Family Name: {user.family_name}</p>
                <p className="userInfo" id="userInfo4">
                    Email: {user.email}</p>
                <p className="userInfo" id="userInfo5">
                    Sub: {user.sub}</p>
            </div>
        </>
    )
}
*/

const AddDropDownItem = (menuObj: NavItemType) =>
{
    if (menuObj.children)
        return AddDropDown(menuObj);
    else if (menuObj.href)
        return <NavDropdown.Item className="nav-item" id={"li-" + menuObj.id} href={menuObj.href}>{menuObj.name}</NavDropdown.Item>;
    else if (menuObj.to)
        return <NavDropdown.Item className="nav-item" id={"li-" + menuObj.id} href={menuObj.to}>{menuObj.name}</NavDropdown.Item>;
    else
        return <NavDropdown.Item className="nav-item" id={"li-" + menuObj.id} href="#">{menuObj.name}</NavDropdown.Item>;
}

const AddDropDown = (menuObj: NavItemType) =>
{
    const DDItems = (menuObj.children) ? menuObj.children.map(AddDropDownItem) : "";

    return (<NavDropdown id={"li-" + menuObj.id} title={menuObj.name}>{DDItems}</NavDropdown>);
}

const AddNavItem = (menuObj: NavItemType, side: string) =>
{
    // Skip hidden applications
    if (menuObj.hidden || menuObj.side != side)
        return null;

    if (menuObj.children)
        return AddDropDown(menuObj);
    else if (menuObj.href)
        return <Nav.Link className="nav-item" id={"li-" + menuObj.id} href={menuObj.href}>{menuObj.name}</Nav.Link>;
    else if (menuObj.to)
        return <Nav.Link className="nav-item" id={"li-" + menuObj.id} href={menuObj.to}>{menuObj.name}</Nav.Link>;
    else
        return (<Navbar.Text id={"li-" + menuObj.id}>{menuObj.name}</Navbar.Text>);
}

const ColNav = (props) =>
{
    const Items = props.items.map((obj: NavItemType) => { return AddNavItem(obj, props.side) });

    return (
        <Nav id={"main-nav-"+props.side+"-ul"} className="navbar-nav col">
            {Items}
            {props.children}
        </Nav>
    );
}

const ThreeBar = ({menu}) =>
{
    const { user } = useAuth();

    useEffect(() =>
    {
        if (user)
        {
            if (user.isAuthenticated)
            {
               console.log("The user is Authenticated()");
            }
        }

        // Make sure the user is empty
        console.log("User updated");
    }, [user]);

   // const LeftItems = menu.map((obj: NavItemType) => { return AddNavItem(obj, 'left') }).filter;
    //const RightItems = menu.map((obj: NavItemType) => { return AddNavItem(obj, 'right') }).filter;

    /** react.bootstrap */
    return (
        <Navbar bg="light" data-bs-theme="light" id="top-navbar">
            <ColNav side='left' items={menu} />
            <div className='navbar-nav col'>
                <a className="navbar-logo" href="/">
                    <img src={logo} className="top-logo" alt="Nevada Prime Logo" />
                </a>
            </div>
            <ColNav side='right' items={menu}>
                {
                    (user.isAuthenticated)
                        ? (
                            <span className="navbar-text p-0" style={{display: 'contents'}}>
                                <LogoutButton />
                                <strong className='text-primary'>Welcome {user.firstName} {user.lastName}</strong>
                            </span>
                        )
                        : (
                            <span className="navbar-text p-0" style={{display: 'contents'}}>
                                <LoginButton />
                                <Link className='nav-link' to="register">
                                    <b><u>Sign Up</u></b>
                                </Link>
                            </span>
                        )
                }
            </ColNav>
        </Navbar>
    );
};

export default ThreeBar;