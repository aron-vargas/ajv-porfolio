import React from "react";
import "include/style/App.css";
import type { RouteObject } from "react-router-dom";
import { Outlet, Link, useRoutes, useParams, useLocation } from "react-router-dom";
import Config from "./config.json";
import NavBar, { NavItemType } from "include/components/Navbar";
import LeftNav from "include/components/NavLeft";
import MainContent from "include/components/MainContent";
import Footer from "include/components/Footer";


const routes: RouteObject[] = [
{
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <MainContent />
        },
        {
            path: "*",
            element: <NoMatch />
        },
    ],
}];

// Add any routes to our list.
let appRoutes = Config.applications.map((app: MyComponents) => {
    import {appRoutes} from app.ComponentFile;

    if (appRoutes)
        routes.push(appRoutes);
});
/**
 * Original App from when I was learning
 *
import NavBar from "include/components/Navbar";
import LeftNav from "include/components/NavLeft";
import MainContent from "include/components/MainContent";
import Footer from "include/components/Footer";

// App Class
// Main class for the webpage content
class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      page: "home",
      user: "guest",
      status: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <LeftNav />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
*/

/**
 * This defines the customer Component type
 * This is used to dynamically create pages
 * Routes and NavItems can be defined
 */
interface MyComponents {
    id: string,
	name: string,
    ComponentFile : string
}

export default function App()
{
    // The useRoutes() hook allows you to define your routes as JavaScript objects
    // instead of <Routes> and <Route> elements. This is really just a style
    // preference for those who prefer to not use JSX for their routes config.
    let element = useRoutes(routes);

    return (
    <div>
      <h1>Route Objects Example</h1>

      <p>
        This example demonstrates how to use React Router's "route object" API
        instead of the JSX API to configure your routes. Both APIs are
        first-class. In fact, React Router actually uses the object-based API
        internally by creating route objects from your{" "}
        <code>&lt;Route&gt;</code>
        elements.
      </p>

      <p>
        React Router exposes a <code>useRoutes()</code> hook that allows you to
        hook into the same matching algorithm that <code>&lt;Routes&gt;</code>{" "}
        uses internally to decide which <code>&lt;Route&gt;</code> to render.
        When you use this hook, you get back an element that will render your
        entire route hierarchy.
      </p>

      {element}
    </div>
    );
}

const Layout = () =>
{
    let NavMenu: NavItemType[] = [
        {
            text: "Home",
            id: "home",
            submenu: [
                {
                    id: "general",
                    text: "General",
                    href: "/home/general"
                }
            ],
        },
        {
            text: "Buy",
            id: "buy",
            href: "/buy",
        },
        {
            text: "Sell",
            id: "sell",
            href: "/sell",
        },
        {
            text: "Rent",
            id: "rent",
            href: "/rent",
        },
        {
            text: "Community",
            id: "community",
            href: "/community",
        },
        {
            text: "Resources",
            id: "resources",
            href: "/resources",
        },
        {
            text: "About",
            id: "about",
            href: "/about",
        },
        {
            text: "Conact Us",
            id: "contactus",
            href: "/contactus",
        }
    ];

    let LeftMenu = "";

    return (
    <div>
        <NavBar menu={NavMenu} />
        <hr />
        <LeftNav propMenu={LeftMenu} />
        <div className='main-cont'>
            <Outlet />
        </div>
        <hr />
        <Footer />
    </div>
    );
}

function NoMatch()
{
    let location = useLocation();

    return (
    <div className='nomatch'>
        <div className='msg'>
            <h2>
                <i className='fa fa-warning'> </i>
                There seems to be a glitch in the matrix...
            </h2>
            <div className='note sm-txt'>
                Unable to find the path you requested. You can go <Link to="/">Back to Home</Link> or
                try looking at our <Link to="/help">Help Center</Link> if you need a hand.
            </div>
            <div className='xs-txt'>
                Location: {location.pathname}
            </div>
        </div>
    </div>
    );
}
