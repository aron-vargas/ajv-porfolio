import "include/style/App.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { AuthProvider } from "include/components/useAuth";
import { AppRouter } from "include/components/AppRoutes";
import { AppErrorBoundary } from "include/components/ErrorBoundy";

// Add fontawesome fas to the library
library.add(fas, fab);

/**
 * Main Component for this Application.
 * Build Layout
 * Add routes
 * @returns string
 */
export default function App()
{
    return (
        <AppErrorBoundary>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </AppErrorBoundary>
    );
}
