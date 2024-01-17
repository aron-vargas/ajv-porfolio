import { IDXSearchbar } from "include/components/pages/Welcome";
import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader()
{
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the Buy.tsx loader function!";
}

export const Component = () =>
{
	return (<div className="container">
        <div className='container-fluid neighbor-bg'>
            <IDXSearchbar/>
        </div>
        <div className='container-fluid bt-1 bb-1'>
            <h2>Buyer's Guid</h2>
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
	</div>);
}
Component.displayName = "BuyPage";
