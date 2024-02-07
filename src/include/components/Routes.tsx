import Admin from "include/views/Admin";
import Welcome from "include/views/Welcome";
import UserProfile from "include/views/Profile";
import Register from "include/views/Register";
import { NoMatch } from "include/components/ErrorBoundy";

export const ChildRoutes = [
    {
        id: "index-route",
        index: true,
        element: <Welcome />,
        ErrorBoundary: NoMatch
    },
    {
        id: "home",
        path: "/",
        element: <Welcome/>,
        ErrorBoundary: NoMatch
    },
    {
        id: "buy-page",
        path: "/buy",
        lazy: () => import("include/views/Buy")
    },
    {
        id: "sell-page",
        path: "/sell",
        lazy: () => import("include/views/Sell")
    },
    {
        id: "rent-page",
        path: "rent",
        lazy: () => import("include/views/Rent")
    },
    {
        id: "agent-page",
        path: "agent",
        lazy: () => import("include/views/FindAgent")
    },
    {
        id: "rental-page",
        path: "rent",
        lazy: () => import("include/views/Rent")
    },
    {
        id: "comunity-calendar",
        path: "calendar",
        lazy: () => import("include/views/Calendar")
    },
    {
        id: "about-page",
        path: "about",
        lazy: () => import("include/views/About")
    },
    {
        id: "admin-route",
        path: "admin",
        element: <Admin />,
        ErrorBoundary: NoMatch
    },
    {
        id: "profile-route",
        path: "profile",
        element: <UserProfile />,
        ErrorBoundary: NoMatch
    },
    {
        id: "register-route",
        path: "register",
        element: <Register />,
        ErrorBoundary: NoMatch
    },
    {
        id: "no-match",
        path: "*",
        element: <NoMatch />
    }
];

export default ChildRoutes