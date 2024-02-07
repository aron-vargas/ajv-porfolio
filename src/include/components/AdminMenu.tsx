import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AddNavItem } from "include/components/Navbar";
import { useAuth } from 'include/components/useAuth';

export const AdminMenu = () =>
{
    const auth = useAuth();

    // Dont show any thing unless this is an admin
    if (!auth.user.user_id) return (<></>);

    const admin_items = [
        {
            id: 'user-list',
            name: 'Users',
            side: 'admin-left',
            hidden: false,
            skipNav: false,
            to: "/admin?tab=users",
        },
        {
            id: 'session-list',
            name: 'Sessions',
            side: 'admin-left',
            hidden: false,
            skipNav: false,
            to: "/admin?tab=sessions",
        },
        {
            id: 'token-list',
            name: 'Tokens',
            side: 'admin-left',
            hidden: false,
            skipNav: false,
            to: "/admin?tab=tokens",
        },
    ]

    const NavItems = admin_items.map((obj) => { return AddNavItem(obj, 'admin-left') })

    return (
        <Navbar className='sticky-top' id="admin-navbar" variant='elegant'>
            <Nav id={"main-nav-admin-left-ul"} key={"main-nav-admin-left-ul"} variant="underline" className="navbar-nav">
                <span className="navbar-brand">Admin Options: </span>
                {NavItems}
            </Nav>
        </Navbar>
    )
}

export default AdminMenu