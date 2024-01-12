import { RouteObject, createBrowserRouter, RouterProvider, Link, Outlet, useLocation, useRouteError } from "react-router-dom";
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'
import Config from "../config.json";
import NavBar, { NavItemType } from "include/components/Navbar";
import Footer from "include/components/Footer";

const ConfigText = JSON.stringify(Config);

/**
 * This defines the custom type
 * This is used to dynamically create Routes
 */
export interface MyApplication {
    id: string,
	name: string,
    to?: string,
    href?: string,
    isIndex?: boolean,
    path?: string,
    elementName?: string,
    componentFile?: string,
    children?: MyApplication[]
}

/**
 * This is the default view to display a page's content in
 * @return <HTML>
 */
const Maincontent = () => {
	return (<div className="col-xs-12 col-sm-9 col-md-8 body">
	    <p>Whats up? Welcome to my Main Content!!</p>
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
    let NavMenu = JSON.parse(ConfigText) as NavItemType[];

    return (<div>
        <NavBar menu={NavMenu} />
        <hr />
        <div className='main-cont'>
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
        </div>
        <hr />
        <Footer />
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
    let NavMenu = JSON.parse(ConfigText);
    console.log("We should have a fresh copy of the Config");
    console.log(NavMenu.applications);

    //const LeftMenu = [];

    return (<div>
        <NavBar menu={NavMenu.applications} />
        <hr />
        <div className='main-cont'>
            <Outlet />
        </div>
        <hr />
        <Footer />
    </div>);
}

/**
 * Convert an MyApplication to a RouteObject
 *
 * @param routeObj <MyApplication>
 * @returns RouteObject
 */
export const AddRoute = (appObj: MyApplication) =>
{
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
        }
        else if (appObj.componentFile)
        {
            var filePath = appObj.componentFile;
            appRoute.lazy = () => import(`${filePath}`)
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
    let myRoutes = apps.map ((appObj) => {
        var route = AddRoute(appObj);
        return route;
    });

    return myRoutes;
}

/**
 * Main export for building the application router object
 *
 * @returns <HTML>
 */
export const AppRouter = () =>
{
    // Parse the config to get application list
    // Use the application list to build browser router
    let myApps = Config.applications as MyApplication[];
    let childRoutes = ApplicationRoutes(myApps);

    // Create an array of Route objects used to create the browser router
    // Need a base route to define the default layout
    let myRoutes: RouteObject[] = [
        {
            path: "/",
            element: <DefaultLayout />,
            children: childRoutes
        },
        {
            path: "*",
            element: <NoMatch />,
        }
    ];

    const myrouter = createBrowserRouter(myRoutes);

    return (<RouterProvider router={myrouter} fallbackElement={<p>Loading...</p>} />);
}