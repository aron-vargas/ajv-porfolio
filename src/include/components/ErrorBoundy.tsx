import { useLocation, useRouteError } from "react-router-dom";
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

/**
 * This is the default view when a route does not match
 * i.e. catch all or splat route
 * @return <HTML>
 */
export const NoMatch = () =>
{
    let location = useLocation();
    const error = useRouteError();

    return (
        <div className='nomatch' >
            <div className='msg'>
                <h2>
                    <FAI icon='triangle-exclamation' color='orange'/>
                    There seems to be a glitch in the matrix...
                </h2>
                <div className='note sm-txt'>
                    <div>Unable to find the path you requested.</div>
                    <div>You can go <a href="/">Back to Home</a> or</div>
                    <div>try looking at our <a href="/help">Help Center</a> if you need a hand.</div>
                </div>
                <div className='note sm-txt'>
                    <pre>{JSON.stringify(error)}</pre>
                </div>
                <div className='xs-txt'>
                    Location: {location.pathname}
                </div>
            </div>
        </div>
    );
}

export const ErrorFB = ({ error }) =>
{
    const { resetBoundary } = useErrorBoundary();

    return (
    <div className='nomatch'>
        <div className='msg'>
            <h1>
                <FAI icon='triangle-exclamation' color='orange'/>
                Uh oh, something went terribly wrong!!!
            </h1>
            <pre>{error.code && error.code} :: {error.message || JSON.stringify(error)}</pre>
            <button className='btn btn-primary mx-5 my-5 px-4' onClick={() => (window.location.href = "/")}>
                Click here to reload the app
            </button>
            <button className={"retry-button"} onClick={resetBoundary}>
                <FAI icon='recycle' /> Try Again!
            </button>
        </div>
    </div>
    );
}

export function AppErrorBoundary(props: any)
{
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFB}
            onError={(error, errorInfo) => {
                // log the error
				console.log("Error caught!");
				console.error(error);
				console.error(errorInfo);
            }}
            onReset={() => {
                // reloading the page to restore the initial state
                // of the current page
                console.log("reloading the page...");
                window.location.href = "/";
                // other reset logic...
            }}
        >
            {props.children}
        </ErrorBoundary>
    );

}

export default AppErrorBoundary;