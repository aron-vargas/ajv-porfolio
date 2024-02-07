import { Suspense } from "react"
import { useLoaderData } from "react-router-dom";
import { NoMatch } from "include/components/ErrorBoundy";
import { IDXSearchbar } from "include/views/Welcome";
import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader()
{
    return "I came from the Buy.tsx loader function!";
}

export const Component = () =>
{
    let data = useLoaderData();

	return (
    <Suspense fallback={ <div>Loading....</div> }>
        <div className="container">
            <div className='container-fluid neighbor-bg'>
                <IDXSearchbar/>
            </div>
            <div className='container-fluid bt-1 bb-1'>
                <h2>Buyer's Guide</h2>
                <div className="canva-embeded">
                    <iframe loading="lazy" className="canva-iframe"
                        src="https://www.canva.com/design/DAFW1UgFZg4/view?embed" allowFullScreen={true} allow="fullscreen">
                    </iframe>
                </div>
                <a
                    href="https://www.canva.com/design/DAFW1UgFZg4/view?utm_content=DAFW1UgFZg4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                    target="_blank"
                    rel="noopener">Copy of GWG Buyer Guide</a> by Michelle Barney
            </div>
	    </div>
    </Suspense>);
}
Component.displayName = "BuyPage";

export function ErrorBoundary() { return <NoMatch/> }
