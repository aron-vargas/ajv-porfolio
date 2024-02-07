import { Suspense } from "react"
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'
import { NoMatch } from "include/components/ErrorBoundy";

export async function loader()
{
    return "I came from the Sell.tsx loader function!";
}

export const Component = () =>
{
    let data = useLoaderData();

	return (<Suspense fallback={ <div>Loading....</div> }>
        <div className="col-xs-12 col-sm-9 col-md-8 body">
	        <p>Sell Something!</p>
            <p><FAI icon="house" /></p>
    	</div>
    </Suspense>);
}
Component.displayName = "SellPage";

export function ErrorBoundary() { return <NoMatch/> }
