import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { useAuth, emptyUser } from "include/components/useAuth";

const Resister = () =>
{
    const [key, setKey] = useState('login-tab');
    const [password2, SetPassword2] = useState('');
    const [formUser, setFormUser] = useState(emptyUser);

    const auth = useAuth();

    const FormSubmit = (fData) =>
    {
        const pass1 = fData.get('password');
        const pass2 = fData.get('password2');

        if (!pass1)
        {
            return false;
        }
        if (pass1 !== pass2)
        {
            return false;
        }

        auth.updateUser(formUser);
        return true;
    }
    const LoginSubmit = (fData) =>
    {
        formUser.email = fData.get('login-email');
        formUser.password = fData.get('login-password');

        if (!formUser.email)
        {
            return false;
        }

        if (!formUser.password)
        {
            return false;
        }

        setFormUser(formUser);
        auth.login(formUser);
        return true;
    }
    const SetAttribute = (e) =>
    {
        let attribute = e.target.id;
        formUser[attribute] = e.target.value;
        setFormUser(formUser);
    }

    const HandleSelKey = (eventKey) =>
    {
        console.log("Selecting " + eventKey);
        setKey(eventKey);
    }

    // Want to hide the third tab not just disable it
    const css = `.register-container .nav-link.disabled { display: none; }`;

    return (
    <div className='container register-container'>
        <style>{css}</style>
        <Tabs id="formTab" activeKey={key} className="nav nav-tabs" onSelect={HandleSelKey}>
            <Tab className="nav-item" eventKey="login-tab" title="Log In">
                <h2 className="text-center my-2">Welcome!</h2>
                <div className="tab-pane" id="login-form">
                    <form className='needs-validation' action='{LoginSubmit}' method='POST'>
                        <label className='form-label' htmlFor={formUser.email}>Email Address</label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon="at" /></span>
                            <input id='login-email' className="form-control" type='email' onChange={SetAttribute} placeholder="Enter Email Address" required pattern=".*@.*\..*" />
                            <div className="invalid-feedback">
                                Please provide a valid email address.
                            </div>
                        </div>
                        <label className='form-label' htmlFor={formUser.password as string}>Password</label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon="lock" /></span>
                            <input id='login-password' className="form-control" type='password' onChange={SetAttribute} placeholder="Enter Password" minLength={8} required/>
                            <div className="invalid-feedback">
                                Please provide a valid password.
                            </div>
                        </div>
                        <div className="form-group button-group">
                            <button id='login-btn' className='btn btn-primary form-control' type='submit'>Log In</button>
                        </div>
                    </form>
                    <div className='helper-text text-center mb-4'>
                        Not a member?
                        <button id='register-tab2' className="flat mx-1" onClick={() => { HandleSelKey("register-tab") }}><b><u>Register</u></b></button>
                    </div>
                    <div className='helper-text text-center mb-4'>
                        <button id='reset-tab-btn' className="flat mx-1" onClick={() => { HandleSelKey("reset-tab") }}><b><u>Forgot Password?</u></b></button>
                    </div>
                </div>
            </Tab>
            <Tab className="nav-item" eventKey="register-tab" title="Register">
                <h2 className="text-center my-2">Welcome!</h2>
                <div className="tab-pane" id="register-form" role="tabpanel" aria-labelledby="pills-register-form-tab">
                    <form className='needs-validation' action='{FormSubmit}' method='POST'>
                        <label className='form-label' htmlFor={formUser.firstName}>
                            First Name
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='user' /></span>
                            <input id='firstName' className="form-control" type='text' onChange={SetAttribute} placeholder="First Name" required/>
                            <div className="invalid-feedback">
                                Please provide a valid first name.
                            </div>
                        </div>
                        <label className='form-label' htmlFor={formUser.lastName}>
                            Last Name
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='user' /></span>
                            <input id='lastName' className="form-control" type='text' onChange={SetAttribute} placeholder="Last Name" required/>
                            <div className="invalid-feedback">
                                Please provide a valid last name.
                            </div>
                        </div>
                        <label className='form-label' htmlFor={formUser.phone}>
                            Phone
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='phone' /></span>
                            <input id='phone' className="form-control" type='tel' onChange={SetAttribute} placeholder="Phone Number"/>
                        </div>
                        <label className='form-label' htmlFor={formUser.email}>
                            Email
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='at' /></span>
                            <input id='email' className="form-control" type='email' onChange={SetAttribute} value='' placeholder="Email Address" required pattern=".*@.*\..*"/>
                            <div className="invalid-feedback">
                                Please provide a valid email address.
                            </div>
                        </div>
                        <label className='form-label' htmlFor={formUser.password as string}>
                            Password
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='lock' /></span>
                            <input id='password' className="form-control" type='password' onChange={SetAttribute} value='' placeholder="Password" minLength={8} required/>
                            <div className="invalid-feedback">
                                Please provide a valid password.
                            </div>
                        </div>
                        <label className='form-label' htmlFor={password2}>
                            Confirm Password
                        </label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon='lock' /></span>
                            <input id='password2' className="form-control" type='password' onChange={(e) => SetPassword2(e.target.value)} placeholder="Confirm Password" minLength={8} required/>
                            <div className="invalid-feedback">
                                Passwords must match.
                            </div>
                        </div>
                        <div className="form-group button-group">
                            <button id='submit-btn' className='btn btn-primary form-control' type='submit'>Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className='alert alert-success'>
                    <p className="mb-2">By registering on the site you will have full access to up-to-date and accurate MLS listing information.
                    Save the searches you perform or save your favorite listings so you can be notified when new listings
                    hit the market or a listing price changes!</p>
                    <p className="mb-2">Looking for market information so you can get the best value for your property? Check out our FREE market
                    report tool which will provide immediate market details using MLS data.</p>
                    <p>Your contact information is never shared or distributed</p>
                </div>
            </Tab>
            <Tab id="hidden-tab" eventKey="reset-tab" title="Reset" disabled>
                <div className="tab-pane" id="reset-form">
                    <form className='needs-validation' action='{LoginSubmit}' method='POST'>
                        <label className='form-label' htmlFor={formUser.email}>Email Address</label>
                        <div className="input-group mb-4">
                            <span className="input-group-text"><FAI icon="at" /></span>
                            <input id='login-email' className="form-control" type='email' onChange={SetAttribute} placeholder="Enter Email Address" required pattern=".*@.*\..*" />
                            <div className="invalid-feedback">
                                Please provide a valid email address.
                            </div>
                        </div>
                        <div className="form-group button-group">
                            <button id='login-btn' className='btn btn-primary form-control' type='submit'>Send Reset Link</button>
                        </div>
                    </form>
                    <div className='helper-text text-center mb-4'>
                        Not a member?
                        <button id='register-tab2' className="flat mx-1" onClick={() => { HandleSelKey("register-tab") }}><b><u>Register</u></b></button>
                    </div>
                </div>
            </Tab>
        </Tabs>
    </div>);
}

export default Resister;