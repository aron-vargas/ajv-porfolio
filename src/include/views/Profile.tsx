import "include/style/Profile.css";
import { useState, useEffect, useReducer } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useAuth } from 'include/components/useAuth';
import { APIPost, APIGet } from "include/components/APIRequest";

const PhoneNumber = ({phone}) =>
{
    // Format the string to get a nicer looking phone number
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d+)$/);

    let num = <FAI icon="phone-slash" color="grey"/>;

    if (match)
    {
        var intlCode = match[1] ? '+1 ' : '';

        num = (
            <Link className='me-1' to={"tel:"+phone}>
                <FAI icon="phone"/> {intlCode} ({match[2]}) {match[3]}-{match[4]}
            </Link>
        )
    }

    return <span>{num}</span>;
}

const Email = ({email}) =>
{
    let icon = (<><FAI icon="notdef" color="grey"/> No email</>);

    if (email)
        icon = (
            <Link className='me-1' to={"mailto:" + email}>
                <FAI icon="envelope"/> {email}
            </Link>
        )

    return <span>{icon}</span>;
}
const UserImg = ({className, clickHandler}) =>
{
    const { profileImgSrc } = useAuth();

    return (<div className={className}>
        <img alt='Click To Change' title='Click To Change' style={{cursor: 'pointer'}} src={profileImgSrc} onClick={clickHandler}/>
    </div>)
}

const ImageFormReducer = (state, action) =>
{
    const { user } = useAuth();

    switch (action.type)
    {
        case 'setUserId':
        {
            return {
                ...state,
                suser_id: action.newVal
            };
        }
        case 'setFile':
        {
            let newSate = {
                ...state,
                user_id: user.user_id,
                profile_img: action.newVal
            }
            return newSate;
        }
        case 'error':
        {
            return {
                ...state,
                error: action.newVal
            };
        }
        default :
            return {
                ...state,
                error: 'Unknown action: ' + action.type
            };
    }
}

/**
 * Image File upload modal
 * @param boolean
 * @param Object
 * @returns <ReactElement>
 */
const ImageUpload = ({showImgModal, ToggleImageUpload}) =>
{
    const [form, dispatch] = useReducer(ImageFormReducer, { user_id: 0, profile_img: null, error: null});

    const APICallBack = () =>
    {
        // Try and trigger a reload for ALL the user images
        ToggleImageUpload();
        window.location.reload();
    }

    const UploadImage = () =>
    {
        if (form.profile_img && form.user_id)
        {
            const formData = new FormData();
            formData.append("user_id", form.user_id);
            formData.append("profile_img", form.profile_img);

            APIPost("/users/upload_img", formData, { headers: {"Content-Type": "multipart/form-data"} })
                .then(APICallBack)
                .catch(error =>
                {
                    console.log("ImageUpload[catch]: ", error);
                    dispatch({type: 'error', newVal: error.message})
                });
        }
    }

    function handleUserChange(user)
    {
        dispatch({type: 'setUserId', newVal: user.user_id});
    }

    const SetImage = (e) =>
    {
        dispatch({type: 'setFile', newVal: e.target.files[0]});
    }

    const ToggleModal = () =>
    {
        if (showImgModal)
            dispatch({type: 'error', newVal: ""})
        ToggleImageUpload();
    }

    return (
        <Modal show={showImgModal} onHide={ToggleModal}>
            <Modal.Header id='upload-modal-header' closeButton>
                <Modal.Title id='upload-modal-title'>Upload Your Profile Pic</Modal.Title>
            </Modal.Header>
            { (form.error) ? (<Modal.Body id='upload-modal-error'>{form.error}</Modal.Body>) : "" }
            <Modal.Body id='upload-modal-body'>
                <label className='form-label' htmlFor="img-file">Upload Image</label>
                <div className="input-group">
                    <span className="input-group-text"><FAI icon="upload" /></span>
                    <input id='img-file' className="form-control" type='file' name='profile_img' onChange={SetImage} placeholder="Upload your profile picture" required/>
                    <div className="invalid-feedback">
                        Please select a file to upload.
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer id='upload-modal-footer' className='d-flex'>
                <Button className='btn-sm' variant="primary" onClick={UploadImage}>
                    Upload
                </Button>
                <Button className='btn-sm ms-1' variant="light" onClick={ToggleModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

/**
 * Profile Face Sheet/Card
 * @param Object
 * @returns <ReactElement>
 */
const UserFace = ({user}) =>
{
    const [showImgModal, toggleImgModal] = useState(false);

    let nameTag = <h2>-- Missing User Information --</h2>

    if (user.first_name || user.last_name)
    {
        const nickName = (user.nick_name) ? (<span className='badge bg-light align-text-top fs-6 text-primary'><FAI icon='at'/> {user.nick_name}</span>) : "";
        nameTag = <h1>{user.first_name} {user.last_name}{nickName}</h1>
    }

    const ToggleImageUpload = () =>
    {
        if (user.user_id)
            toggleImgModal(!showImgModal);
        else
            alert("Login to set your profile picture");
    }

    return (
    <div className="d-flex p-2 position-relative">
        <div className='position-absolute top-0 end-0'>
            <Link className='btn btn-sm btn-outline-secondary m-1' to='?edit=1' title='Edit Profile'>
                <FAI icon="bars"/>
            </Link>
        </div>
        <div className='col col-md-3'>
            <UserImg className='profile-img-container' clickHandler={ToggleImageUpload}/>
        </div>
        <div className="col col-md-9">
            {nameTag}
            <p className="user-info fs-6 fw-light fst-italic">
                {(user.lastLogin) ? "Last Login: " + user.lastLogin : "No informatino available"}
            </p>
            <div className="social-media-links">
                <Link to="www.facebook.com"><FAI icon={faFacebook}/></Link>
                <Link to="www.linkedin.com"><FAI icon={faLinkedin}/></Link>
                <Link to="www.twitter.com"><FAI icon={faTwitter}/></Link>
                <Link to="www.google.com"><FAI icon={faGoogle}/></Link>
            </div>
            <div className="social-media-links">
                <PhoneNumber phone={user.phone}/>
                <Email email={user.email}/>
            </div>
        </div>
        <ImageUpload showImgModal={showImgModal} ToggleImageUpload={ToggleImageUpload} />
    </div>)
}

const UserAbout = ({user}) =>
{
    const { updateUser } = useAuth();

    const getUserRespons = (res) =>
    {
        if (res?.data)
        {
            user = res.data;
            updateUser(user)
        }
    }

    const getUser  = () =>
    {
        if (user.user_id)
        {
            const url = "/users/"+user.user_id;

            // Get the Profile information
            APIGet(url)
                .then(getUserRespons)
                .catch(error =>
                {
                    console.log("UserAbout (getUser) catch:: ", error);
                    alert("Error caught trying to GET user");
                });
        }
    }

    const getSessionRespons = (res) =>
    {
        if (res?.data)
        {
            user.session = res.data;
            updateUser(user)
        }
    }
    const getSession  = () =>
    {
        if (user.user_id)
        {
            const url = "/auth/session/"+user.user_id;

            // Get the Profile information
            APIGet(url)
                .then(getSessionRespons)
                .catch(error =>
                {
                    console.log("UserAbout (getSession) catch:: ", error);
                    alert("Error caught trying to GET session");
                });
        }
    }

    const getTokenRespons = (res) =>
    {
        if (res?.data)
        {
            user.user_token = res.data;
            updateUser(user)
        }
    }
    const getToken  = () =>
    {
        if (user.user_id)
        {
            const url = "/auth/token/";

            // Get the Profile information
            APIGet(url)
                .then(getTokenRespons)
                .catch(error =>
                {
                    console.log("UserAbout (getToken) catch:: ", error);
                    alert("Error caught trying to GET token");
                });
        }
    }

    const theinfo = JSON.stringify(user, null, 2);

    return (
        <div>
            <div className="card-header">
                <h2>About Me</h2>
                <div className="position-absolute top-0 end-0 pt-2 pe-2">
                    <button type='button' className='btn btn-sm btn-primary me-1' onClick={getUser}><FAI icon='user' /></button>
                    <button type='button' className='btn btn-sm btn-secondary me-1' onClick={getSession}><FAI icon='hourglass' /></button>
                    <button type='button' className='btn btn-sm btn-secondary' onClick={getToken}><FAI icon='lock' /></button>
                </div>
            </div>
            <div className="card-body">
                <div className="border-bottom">API Stucture</div>
                <div className="info">
                    <pre style={{fontSize: '8pt'}}>
                        {theinfo}
                    </pre>
                </div>
                <div className="border-bottom">Category</div>
                <div className="info">
                    Session Info Goes Here
                </div>
                <div className="border-bottom">Category</div>
                <div className="info">
                    Token Info Goes Here
                </div>
            </div>
        </div>
    )
}

const UserFeed = ({user}) =>
{
    return (
    <div>
        <div className="card-header">
            <h2>Feed</h2>
        </div>
        <div className="card-body">
            <div className="border-bottom">Category</div>
            <div className="fs-6 fw-light fst-italic">2023-01-01 09:12 PM</div>
            <div className="info">
                as;ldkfja asdfjhui auvas asdfuuvsdsd asd asdfuuasd asdasudfuuabsdf
            </div>
            <div className="border-bottom">Category</div>
            <div className="dfs-6 fw-light fst-italicate">2023-01-01 09:12 PM</div>
            <div className="info">
                as;ldkfja asdfjhui auvas asdfuuvsdsd asd asdfuuasd asdasudfuuabsdf
            </div>
        </div>
    </div>)
}

const UserInfo = ({user}) =>
{
    return (
        <div>
            <div className="card-body">
                <div className="border-bottom">BIO</div>
                <div className="info">
                    This is some interesting stuff about me
                </div>
            </div>
            <div className="card-body">
                <div className="border-bottom">Possition</div>
                <div className="info">
                    Staff Agent (real inportant)
                </div>
            </div>
            <div className="card-body">
                <div className="border-bottom">Peers</div>
                <div className="info">
                    <div><FAI icon='user' /> First Peer</div>
                    <div><FAI icon='user' color='red'/> First Peer</div>
                    <div><FAI icon='user' color='blue'/> Second Peer</div>
                    <div><FAI icon='user' color='yellow'/> Third Peer</div>
                </div>
            </div>
            <div className="card-body">
                <div className="border-bottom">Start Date</div>
                <div className="fs-6 fw-light fst-italic">
                    {new Date().toString()}
                </div>
            </div>
        </div>
    )
}

export const Profile = () =>
{
    const auth = useAuth();

    return (
        <div className="bg-container">
            <div className="profile-container">
                <div className="row">
                    <div className="col col-md-8">
                        <div className="card mb-2">
                            <UserFace user={auth.user} />
                        </div>
                        <div className="card mb-2">
                            <UserAbout user={auth.user} />
                        </div>
                        <div className="card">
                            <UserFeed user={auth.user} />
                        </div>
                    </div>
                    <div className="col col-md-4">
                        <div className="card">
                            <UserInfo user={auth.user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

