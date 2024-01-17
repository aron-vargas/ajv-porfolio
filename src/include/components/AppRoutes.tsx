import { RouteObject, createBrowserRouter, RouterProvider, Link, Outlet, useLocation, useRouteError } from "react-router-dom";
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'
import Config from "../config.json";
import Welcome from "include/components/pages/Welcome";
import Register from "include/components/pages/Register";
import ThreeBar from "include/components/Navbar";
import Footer from "include/components/Footer";

/**
 * This defines the custom type
 * This is used to dynamically create Routes
 */
export interface MyApplication {
    id: string;
	name: string;
    hidden?: boolean;
    skipRoute?: boolean;
    to?: string;
    href?: string;
    isIndex?: boolean;
    path?: string;
    elementName?: string;
    componentFile?: string;
    children?: MyApplication[];
}

/**
 * This is the default view to display a page's content in
 * @return <HTML>
 */
const Maincontent = () => {
	return (<div>
	    <Welcome />
	</div>);
}

// Dynamic names components require a Map to properly compile
let compMap = {
    main: Maincontent
}

const RootErrorBoundary = () =>
{
    let error = useRouteError() as Error;
    return (
    <div className='nomatch'>
        <div className='msg'>
            <h1>
                <FAI icon='triangle-exclamation' color='orange'/>
                Uh oh, something went terribly wrong!!!
            </h1>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <button className='btn btn-primary mx-5 my-5 px-4' onClick={() => (window.location.href = "/")}>
                Click here to reload the app
            </button>
        </div>
    </div>
    );
}

/**
 * This is the default view when a route does not match
 * i.e. catch all or splat route
 * @return <HTML>
 */
const NoMatch = () =>
{
    let location = useLocation();

    return (
        <div className='nomatch' >
            <div className='msg'>
                <h2>
                    <FAI icon='triangle-exclamation' color='orange'/>
                    There seems to be a glitch in the matrix...
                </h2>
                <div className='note sm-txt'>
                    <div>Unable to find the path you requested.</div>
                    <div>You can go <Link to="/">Back to Home</Link> or</div>
                    <div>try looking at our <Link to="/help">Help Center</Link> if you need a hand.</div>
                </div>
                <div className='xs-txt'>
                    Location: {location.pathname}
                </div>
            </div>
        </div>
    );
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
        <div className='container-fluid bg-light'>
           <ThreeBar menu={NavMenu} />
        </div>
        <div className='main-cont'>
            <Outlet />
        </div>
        <Footer />
    </div>);
}

/**
 * Convert an MyApplication to a RouteObject
 *
 * @param routeObj <MyApplication>
 * @returns RouteObject | NULL
 */
export const AddRoute = (appObj: MyApplication) =>
{
    // Skip hidden applications
    if (appObj.hidden || appObj.skipRoute)
        return null;

    let appRoute: RouteObject = appObj;
    appRoute.errorElement = <RootErrorBoundary />;

    // Set the index flag
    if (appObj.isIndex)
    {
        const elemKey = (appObj.elementName) ? appObj.elementName : "main";
        const ElemName = compMap[elemKey];
        const elem = <ElemName key={appObj.id} />;

        // Index routes dont need the other attributes just set the element
        appRoute = {
            index: true,
            element: elem,
            errorElement: <RootErrorBoundary />
        };

        console.log("Logging Index Route");
        console.log(appRoute);
    }
    else
    {
        // Define the element
        if (appObj.elementName)
        {
            const ElemName = compMap[appObj.elementName];
            const elem = <ElemName key={appObj.id} />;
            appRoute.element = elem;

            console.log("Logging Route with element defined");
            console.log(appRoute);
        }
        else if (appObj.componentFile)
        {
            var filePath = appObj.componentFile;
            appRoute.lazy = () => import(`${filePath}`)

            console.log("Logging lazy Route");
            console.log(appRoute);
        }
        else
        {
            console.log("AppObj does not have route information");
            console.log(appRoute);
        }
    }

    // Add any children the same way
    if (appObj.children)
       appRoute.children = ApplicationRoutes(appObj.children);

    return appRoute;
}

/**
 * Create a route object array from the application config
 *
 * @param apps <MyApplication[]>
 * @return routes <RouteObject[]>
 */
export function ApplicationRoutes(apps: MyApplication[]): RouteObject[]
{
    return apps.filter(AddRoute);
}

/**
 * Main export for building the application router object
 *
 * @returns <HTML>
 */
export const AppRouter = () =>
{
    // Use the Config application list to build browser router
    // Need to create a deep copy here, we dont want to alter the Config
    let myApps = [...Config.applications];
    let childRoutes = ApplicationRoutes(myApps);

    // Add an index and splat/catchall to the end
    childRoutes.push({
        id: "index-route",
        index: true,
        element: <Maincontent />
    },
    {
        id: "register-route",
        path: "register",
        element: <Register />
    },
    {
        id: "no-match",
        path: "*",
        element: <NoMatch />
    });

    // Create an array of Route objects used to create the browser router
    // Need a base route to define the default layout
    let myRoutes: RouteObject[] = [
        {
            path: "/",
            element: <DefaultLayout />,
            children: childRoutes
        }
    ];

    const myrouter = createBrowserRouter(myRoutes);

    return (<RouterProvider router={myrouter} fallbackElement={<p>Loading...</p>} />);
}