import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader()
{
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the Buy.tsx loader function!";
}

export const Component = () =>
{
	return (<div className="col-xs-12 col-sm-9 col-md-8 body">
	    <p>Buy Something!</p>
        <p><FAI icon="money-bill" /></p>
	</div>);
}
Component.displayName = "BuyPage";
