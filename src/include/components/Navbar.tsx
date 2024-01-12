import logo from "include/images/NVPrimeLogo.png";
import { Link } from "react-router-dom";

// Create a type for NavItem so that this can be used by other components later with data integrity
export interface NavItemType {
    id: string;
    name: string;
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
    return (<button className="btn btn-primary mx-5 my-5 px-4">Log In</button>);
};

/**
 * Button for logout
 * @returns <HTML>
 */
export const LogoutButton = () => {
    return (
        <>
            <button className="btn btn-secondary mx-5 my-5 px-4 logoutBtn">
                Log Out
            </button>
            <br />

        </>
    );
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
 * @param item NavItemType
 * @param children NavItemTypep[]
 * @returns <HTML>
 */
const NavItem = ({item}) =>
{
    console.log('Add LI Item:');
    console.log(item);

    var li = item.name;

    if (item.children)
        li = (
            <li className="nav-item dropdown" id={"li-" + item.id}>
                <a id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    {item.name}
                </a>
                <NavMenu menu={item.children} navlevel="dropdown-menu" id={"msub-" + item.id} />
            </li>
        );
    else
    {
        if (item.href)
            li = <li className="nav-item" id={"li-" + item.id}><a id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link" href={item.href}>{item.name}</a></li>;
        else if (item.to)
            li = <li className="nav-item" id={"li-" + item.id}><Link id={"atag-" + item.id} key={"atag-" + item.id} className="nav-link" to={item.to}>{item.name}</Link></li>;
        else
            li = <li className="nav-item" id={"li-" + item.id}>{item.name}</li>
    }

    return (li);
};

const NavMenu = ({menu, navlevel, id}) =>
{
    console.log('Add Nav UL with ID:', id);

     //   let ItemSubMenu = MenuObj.children ? (<NavMenu menu={MenuObj.children} navlevel="dropdown-menu" key={"msub-" + MenuObj.id} />) : ("");
    const NavList = menu.map((MenuObj: NavItemType, index: number) =>
    {
        return (<NavItem item={MenuObj} key={"mitem-"+index+"-"+id} />);
    });

    return (
        <ul className={navlevel} id={id+'-ul'} key={id+'-ul'}>
        {NavList}
        </ul>
    );
};

const NavBar = ({menu}) =>
{
    return (
    <nav id="top-navbar" className="navbar navbar-default navbar-expand-sm bg-light navbar-light sticky-top">
      <a className="navbar-brand" href="#top-navbar">
        <img src={logo} className="top-logo" alt="Nevada Prime Logo" />
      </a>
      <NavMenu menu={menu} navlevel="navbar-nav" id="main-nav" />
      <div data-content-block-name="Login Button" className="d-none nav-buttons d-lg-inline-block d-flex">
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
    );
};

export default NavBar;