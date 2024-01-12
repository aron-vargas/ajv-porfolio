import { FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export async function loader()
{
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component()
{
    return (
    <div>
        <h2>About</h2>
        <p>I am all About lazy Loading!</p>
        <p><FAI icon="smile" /></p>
    </div>
    );
}
Component.displayName = "AboutPage";


const About = () =>
{
	return (<div className="col-xs-12 col-sm-9 col-md-8 body">
	    <p>I am all About lazy Loading!</p>
        <p><FAI icon="smile" /></p>
	</div>);
}

export default About;