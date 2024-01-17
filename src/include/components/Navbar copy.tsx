import { useEffect, useContext } from 'react';
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

/**
 * Create a NavItem
 * <LI> element
 * @param item NavItemType
 * @param children NavItemTypep[]
 * @returns <HTML>
 */
const NavItem = ({item, side}) =>
{
    console.log('Add LI Item:');
    console.log(item);

    // Dont add hidden items to the list
    if (item.hidden || item.side != side)
        return null;

    // Empty <LI> element with no link
    var li = <li className="nav-item" id={"li-" + item.id}>{item.name}</li>;

    if (item.children)
    {
        // Add a new NavMenu using children inside the <LI>
        li = (
            <li className="nav-item dropdown" id={"li-" + item.id}>
                <a id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    {item.name}
                </a>
                <NavMenu menu={item.children} navlevel="dropdown-menu" id={"msub-" + item.id} side={side}/>
            </li>
        );
    }
    else
    {
        // Add a new <LI> element
        // Will contain a <a> or <Link>
        if (item.href)
            li = <li className="nav-item" id={"li-" + item.id}><a id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link" href={item.href}>{item.name}</a></li>;
        else if (item.to)
            li = <li className="nav-item" id={"li-" + item.id}><Link id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link" to={item.to}>{item.name}</Link></li>;
    }

    return (li);
};

/**
 * Create a NavMenu
 * <UL> with <LI> elements
 *
 * @param array menu
 * @param string navlevel
 * @param string id
 * @param string side
 * @param ReactNode | ReactNode[] children
 * @returns <HTML>
 */
const NavMenu = ({menu, navlevel, id, side, ...props}) =>
{
    console.log('Add Nav UL with ID:', id);

    //  Use map on the menu array to create NavItem list
    const NavList = menu.map((MenuObj: NavItemType, index: number) =>
    {
        return (<NavItem item={MenuObj} key={"mitem-"+index+"-"+id} side={side} />);
    });

    // Return the <UL> element
    return (
        <ul className={navlevel} id={id+'-ul'} key={id+'-ul'}>
            {NavList}
            {props.children}
        </ul>
    );
};

const NavBar = ({menu}) =>
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

    return (
        <nav id="top-navbar" className="navbar navbar-expand-lg row navbar-light mx-5">
            <NavMenu menu={menu} navlevel="navbar-nav col" id="main-nav" side='left' />
            <div className='navbar-nav col'>
                <a className="navbar-logo" href="/">
                    <img src={logo} className="top-logo" alt="Nevada Prime Logo" />
                </a>
            </div>
            <NavMenu menu={menu} navlevel="navbar-nav col" id="main-nav" side='right' />
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

        </nav>
    );
};

export default NavBar;