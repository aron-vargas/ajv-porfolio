import "include/style/App.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AppRouter } from "include/components/AppRoutes";

// Add fontawesome fas to the library
library.add(fas);

/**
 * Main Component for this Application.
 * Build Layout
 * Add routes
 * @returns string
 */
export default function App()
{
    return (<AppRouter />);
}
