import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown  from 'react-bootstrap/NavDropdown';
import logo from "include/images/NVPrimeLogo.png";
import { Link } from "react-router-dom";
import { ProfilePopup } from 'include/components/Profile';
import { useAuth } from 'include/components/useAuth';

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

const AddDropDownItem = (menuObj: NavItemType) =>
{
    if (menuObj.children)
        return AddDropDown(menuObj);
    else if (menuObj.href)
        return <NavDropdown.Item className="nav-item" id={"dd-li-" + menuObj.id} key={"dd-li-" + menuObj.id} href={menuObj.href}>{menuObj.name}</NavDropdown.Item>;
    else if (menuObj.to)
        return <NavDropdown.Item className="nav-item" id={"dd-li-" + menuObj.id} key={"dd-li-" + menuObj.id} as={Link} to={menuObj.to}>{menuObj.name}</NavDropdown.Item>;
    else
        return <NavDropdown.Item className="nav-item" id={"dd-li-" + menuObj.id} key={"dd-li-" + menuObj.id} href="#">{menuObj.name}</NavDropdown.Item>;
}

const AddDropDown = (menuObj: NavItemType) =>
{
    const DDItems = (menuObj.children) ? menuObj.children.map(AddDropDownItem) : "";

    return (<NavDropdown id={"ul-" + menuObj.id} key={"ul-" + menuObj.id} title={menuObj.name}>{DDItems}</NavDropdown>);
}

export const AddNavItem = (menuObj: NavItemType, side: string) =>
{
    // Skip hidden applications
    if (menuObj.hidden || menuObj.side !== side)
        return null;

    if (menuObj.children)
        return AddDropDown(menuObj);
    else if (menuObj.href)
        return <Nav.Item key={"na-item-" + menuObj.id} ><Nav.Link className="nav-item" id={"na-li-" + menuObj.id} key={"na-li-" + menuObj.id} eventKey={"na-li-" + menuObj.id} href={menuObj.href}>{menuObj.name}</Nav.Link></Nav.Item>;
    else if (menuObj.to)
        return <Nav.Item key={"na-item-" + menuObj.id} ><Nav.Link className="nav-item" id={"na-li-" + menuObj.id} key={"na-li-" + menuObj.id} eventKey={"na-li-" + menuObj.id} as={Link} to={menuObj.to}>{menuObj.name}</Nav.Link></Nav.Item>;
    else
        return (<Navbar.Text id={"li-" + menuObj.id} key={"na-txt-" + menuObj.id}>{menuObj.name}</Navbar.Text>);
}

export const ColNav = (props) =>
{
    let apps = [...props.items];
    apps = apps.filter(obj => obj.side === props.side)
    const Items = apps.map((obj: NavItemType) => { return AddNavItem(obj, props.side) })

    console.log(Items);
    return (
        <Nav id={"main-nav-"+props.side+"-ul"} key={"main-nav-"+props.side+"-ul"} variant="underline" className="navbar-nav col">
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

    /** react.bootstrap */
    return (
        <Navbar bg="dark" data-bs-theme="dark" id="top-navbar">
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
                            <ProfilePopup />
                        )
                        : (
                            <span className="navbar-text p-0" style={{display: 'contents'}}>
                                <a className='btn btn-primary mx-1' href="/register">
                                    Log In
                                </a>
                                <a className='nav-link' href="/register?tab=register-tab">
                                    <b><u>Sign Up</u></b>
                                </a>
                            </span>
                        )
                }
            </ColNav>
        </Navbar>
    );
};

export default ThreeBar;