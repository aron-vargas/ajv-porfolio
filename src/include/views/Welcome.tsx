import logo from 'include/images/NVPrimeLogo.png'
import CRS1 from 'include/images/CRS1.png'
import CRS2 from 'include/images/CRS2.png'
import CRS3 from 'include/images/CRS3.png'
import teamImg from 'include/images/TEAMphoto.png'

/**
 *
 * @returns <HTML>
 */
export const IDXSearchbar = () => {
    return (
        <div className='container'>
            <div className="dark-overlay p-5 my-5 shadow ">
                <h1 className='text-dark'>Find your dream home</h1>
                <form className='mb-1' action="/idx/search/homes-for-sale/any" method="get">
                    <div className="input-group input-group-lg">
                        <input className='form-control' id='search' name='search' type='text' placeholder='Type a city, neighborhood, zip, address, or listing #' />
                        <button className='btn btn-primary'>Search</button>
                    </div>

                    <div className="row mt-2">
                        <div className='col'><button type="button" className="btn btn-primary btn-lg form-control">Price</button></div>
                        <div className='col'><button type="button" className="btn btn-elegant btn-lg form-control">Beds</button></div>
                        <div className='col'><button type="button" className="btn btn-primary btn-lg form-control">Baths</button></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const Carousel = () =>
{
    return (<div className='container'>
    <div id="carouselExampleControls" className="row my-5">
        <div className='col m-2 p-2 border border-3 border-light rounded-3 shadow '>
            <div className="card">
                <img src={CRS1} className="card-img-top" width={200} alt="..."/>
                <div className="card-body">
                    Description Text
                    <div className='text-muted'>Photo 1</div>
                </div>
            </div>
        </div>
        <div className='col m-2 p-2 border border-3 border-light rounded-3 shadow '>
            <div className="card">
                <img src={CRS2} className="card-img-top" width={200} alt="..."/>
                <div className="card-body">
                    Description Text
                    <div className='text-muted'>Photo 2</div>
                </div>
            </div>
        </div>
        <div className='col m-2 p-2 border border-3 border-light rounded-3 shadow '>
            <div className="card">
                <img src={CRS3} className="card-img-top" width={200} alt="..."/>
                <div className="card-body">
                    Description Text
                    <div className='text-muted'>Photo 3</div>
                </div>
            </div>
        </div>
        <div className='col m-2 p-2 border border-3 border-light rounded-3 shadow '>
            <div className="card">
                <img src={CRS2} className="card-img-top" width={200} alt="..."/>
                <div className='card-body'>
                    Description Text
                    <div className='text-muted'>Photo 2</div>
                </div>
            </div>
        </div>
    </div></div>
    );

}

/**
 *
 * @returns <HTML>
 */
export const TeamBox = () =>
{
    return (
        <div className='container-fliud bg-light mx-5'>
            <div className='team'>

                <div className='row bg-light my-3 mx-auto p-3 border border-dark rounded-1'>
                    <div>
                        <h3>Nevada Prime Real Estate </h3>
                        <p>
        1032 Inglewood Dr., Suite 100, Fernley, NV 89408<br/>
        Real Estate Company/Property Management Company<br/>
        775.234.5054<br/>
        License B.143247.LLC/PM.165133.BKR<br/>
                        </p>
                    </div>
                    <div className='col'>
                        <div className='img-box'>
                            <img src={teamImg} width='100%'/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='msg-box'>
With unparalleled industry knowledge, experience, and local expertise, we are your Northern Nevada Real
Estate and Property Management experts.  Whether you are buying, selling, investing or renting we can
help you meet all your real estate goals.
Just looking? That's OK. Use our website all you like to view all available homes in our area.
You will need to create a free account to unlock all the best search features. Once you sign up, you will
be able to save listings, save your search criteria, get automated email updates for new homes matching
your saved search criteria, and much more. We are here to help you with your house hunt!
                        </div>
                        <br/>
                        <h3 className='fs-5'>Mission Statement:</h3>
                        <div className='msg-box'>
To enhance the lives of everyone through Real Estate, by being compassionate, knowledgeable, and innovative.
Our goal is to make a positive impact through the relationships we create and to make our community a
priority by providing support and dedication through our company's passion for success.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

/**
 *
 * @returns <HTML>
 */
const Welcome = () =>
{
    return (<>
        <div className='container-fluid neighbor-bg'>
            <IDXSearchbar/>
        </div>
        <Carousel />
        <TeamBox />
    </>
    )
}

export default Welcome;