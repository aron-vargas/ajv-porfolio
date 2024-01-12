import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader()
{
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the Sell.tsx loader function!";
}

export const Component = () =>
{
	return (<div className="col-xs-12 col-sm-9 col-md-8 body">
	    <p>Sell Something!</p>
        <p><FAI icon="house" /></p>
	</div>);
}
Component.displayName = "SellPage";
