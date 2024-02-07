import { RouteObject, createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import Config from "../config.json";
import ChildRoutes from "include/components/Routes";
import AdminMenu from "include/components/AdminMenu";
import ThreeBar from "include/components/Navbar";
import Footer from "include/components/Footer";
import { NoMatch } from "include/components/ErrorBoundy";

/**
 * This defines the custom type
 * This is used to dynamically create Routes
 */
export interface MyApplication {
    id: string;
	name: string;
    hidden?: boolean;
    to?: string;
    href?: string;
    children?: MyApplication[];
}

/**
 * Define the default layout for this App
 *
 * @returns <ReactComponent>
 */
const DefaultLayout = () =>
{
    // Need to create a deep copy here, we dont want to alter the Config
    let NavMenu = [...Config.applications];
    console.log("We should have a fresh copy of the Config");
    console.log(NavMenu);

    //const LeftMenu = [];

    return (<div>
        <div className='bg-dark sticky-top'>
           <ThreeBar menu={NavMenu} />
           <AdminMenu />
        </div>
        <div className='main-cont'>
            <Outlet />
        </div>
        <Footer />
    </div>);
}

/**
 * Main export for building the application router object
 *
 * @returns <HTML>
 */
export const AppRouter = () =>
{
    //const children = ChildRoutes();

    const myroutes = [{

        path: "/",
        element: <DefaultLayout />,
        children: ChildRoutes
    }];

    const myrouter = createBrowserRouter(myroutes);
    return (<RouterProvider router={myrouter} fallbackElement={<p>Loading...</p>} />);
}