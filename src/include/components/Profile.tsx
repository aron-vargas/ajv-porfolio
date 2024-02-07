import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth } from 'include/components/useAuth';
import NoImg from 'include/images/profile-no-img.png';
import { APIGet } from "include/components/APIRequest";

export const ProfilePopup = () =>
{
    const { user, profileImgSrc, logout } = useAuth();
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const navigate = useNavigate();

    const clickLogout = () =>
    {
        logout();
        navigate('/'); // Redirect to home page
    }

    const PictureClick = () =>
    {
        setShow(!show);
    }
    return (
        <div className='ml-1'>
            <Button className='rounded-circle btn-sm p-0' variant="success" id="profile-drop-btn" style={{width: '2rem'}} ref={target} onClick={PictureClick}>
                <img src={profileImgSrc} alt='Welcome' title={"Welcome " + user.first_name + " " + user.last_name} style={{ width: '100%'}}/>
            </Button>
            <Overlay
                target={target.current}
                show={show}
                placement="bottom-end"
                rootClose={true}
                onHide={() => setShow(false)}>
                <Card style={{ width: '18rem', zIndex: 1021 }}>
                    <img src={profileImgSrc} className='img-border' style={{ width: '10rem'}} />
                    <div className="card-body">
                        <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                         <div className="card-text">
                            <div className="row">
                                <div className="border-1">Information</div>
                                <div className="col">
                                    <div>Email</div>
                                    <div>{user.email}</div>
                                </div>
                                <div className="col">
                                    <div>Phone</div>
                                    <div>{user.phone}</div>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" href="profile" title="Go To Profile">Profile</Button>
                        <button className="btn btn-secondary mx-1" onClick={clickLogout}>Log Out</button>
                    </div>
                </Card>
            </Overlay>
        </div>
    );
}