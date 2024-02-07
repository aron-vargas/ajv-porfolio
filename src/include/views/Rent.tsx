import { Suspense } from "react"
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'
import { NoMatch } from "include/components/ErrorBoundy";

export async function loader()
{
    return "I came from the Rent.tsx loader function!";
}

export const Component = () =>
{
    let data = useLoaderData();

	return (<Suspense fallback={ <div>Loading....</div> }>
        <div className="col-xs-12 col-sm-9 col-md-8 body">
            <p>Rent Something!</p>
            <p><FAI icon="money-bill" /></p>
        </div>
    </Suspense>);
}
Component.displayName = "RentPage";

export function ErrorBoundary() { return <NoMatch/> }
