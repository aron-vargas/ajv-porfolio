import { FC, Suspense } from "react"
import { useLoaderData } from "react-router-dom";

import { NoMatch } from "include/components/ErrorBoundy";
import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader({ request })
{
    return "I came from the About.tsx loader function!";
}

export const Component: FC  = (P = {}) =>
{
    let data = useLoaderData();

    return (
    <Suspense fallback={ <div>Loading....</div> }>
        <h2>About</h2>
        <p>I am all About lazy Loading!</p>
        <p><FAI icon="smile" /></p>
        {JSON.stringify(data)}
    </Suspense>
    );
}
Component.displayName = "AboutPage";

export const ErrorBoundary: FC  = (P = {}) => { return <NoMatch/> }
ErrorBoundary.displayName = "AboutErrorBoundary";
