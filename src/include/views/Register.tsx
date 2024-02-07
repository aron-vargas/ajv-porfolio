import { useState, useMemo } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import ErrorModal from "include/components/ErrorModal";
import { useAuth, emptyUser } from "include/components/useAuth";
import { APIPost } from "include/components/APIRequest";

/**
 * Form for user login
 * @param any props
 * @returns <ReactElement>
 */
const LoginForm = (props: any) =>
{
    const [validated, setValidated] = useState(false);
    const [submitDisabled, disableSubmit] = useState(false);
    const [form, setForm] = useState({ email: '', password: null});
    const [error, setError] = useState({ show: false, message: '' });
    const auth = useAuth();
    const navigate = useNavigate();

    const RespLogin = (resp) =>
    {
        disableSubmit(false);

        console.log("This is where we login: ", resp);
        if (resp)
        {
            if (resp.data)
            {
                auth.login(resp.data);
                navigate('/profile'); // Redirect to profile page
            }
            else
            {
                console.log("RespLogin: no data attribute found in response object");
                setError({show: true, message: resp});
            }
        }
        else
        {
            console.log("Unknown Error: Empty Response");
            setError({show: true, message: "Unknown Error: Empty Response"});
        }
    }

    const LoginSubmit = (e) =>
    {
        setError({ show: false, message: '' });

        if (e.currentTarget.checkValidity())
        {
            disableSubmit(true);

            APIPost("/auth/login", form)//, { headers: {"Content-Type": "multipart/form-data"} })
            .then(RespLogin)
            .catch(error =>
            {
                console.log("LoginSubmit[catch]: ", error);
                disableSubmit(false);
                setError({show: true, message: error});
            });
        }
        //else
        //{
            e.preventDefault();
            e.stopPropagation();
        //}

        setValidated(true);
    }

    const SetAttribute = (e) =>
    {
        const field = e.target.name;
        const value = e.target.value;
        setForm({...form, [field]: value });
    }

    const CloseModel = () =>
    {
        setError({ show: false, message: '' });
    }

    return (<div>
        <ErrorModal show={error.show} title='Login Response Error' body={error.message} handleClose={CloseModel} />
        <h2 className="text-center my-2">Welcome!</h2>
        <div className="tab-pane" id="login-form">
            <Form noValidate validated={validated} onSubmit={LoginSubmit}>
                <label className='form-label' htmlFor="login-email">Email Address</label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon="at" /></span>
                    <input id='login-email' className="form-control" type='email' name="email" value={form.email} onChange={SetAttribute} placeholder="Enter Email Address" required pattern=".*@.*\..*" />
                    <div className="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <label className='form-label' htmlFor="login-password">Password</label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon="lock" /></span>
                    <input id='login-password' className="form-control" type='password' name='password' onChange={SetAttribute} placeholder="Enter Password" minLength={8} required/>
                    <div className="invalid-feedback">
                        Please provide a valid password.
                    </div>
                </div>
                <div className="form-group button-group">
                    <button id='login-btn' className='btn btn-primary form-control' type='submit' disabled={submitDisabled}>Log In</button>
                </div>
            </Form>
            <div className='helper-text text-center mb-4'>
                Not a member?
                <button id='register-tab2' className="flat mx-1" onClick={() => { props.SelTab("register-tab") }}><b><u>Register</u></b></button>
            </div>
            <div className='helper-text text-center mb-4'>
                <button id='reset-tab-btn' className="flat mx-1" onClick={() => { props.SelTab("reset-tab") }}><b><u>Forgot Password?</u></b></button>
            </div>
        </div>
    </div>);
}

/**
 * Form for registering new users
 * @param any props
 * @returns <ReactElement>
 */
const RegisterForm = (props: any) =>
{
    const [validated, setValidated] = useState(false);
    const [submitDisabled, disableSubmit] = useState(false);
    const [password2, SetPassword2] = useState('');
    const [form, setForm] = useState(emptyUser);
    const [error, setError] = useState({ show: false, message: '' });
    const auth = useAuth();
    const navigate = useNavigate();

    const RespRegister = (resp) =>
    {
        disableSubmit(false);

        if (resp)
        {
            if (resp.data)
            {
                auth.login(resp.data);
                navigate('/profile'); // Redirect to profile page
            }
            else
            {
                console.log("RespLogin: no data attribute found in response object");
                setError({show: true, message: resp});
            }
        }
        else
        {
            console.log("Unknown Error: Empty Response");
            setError({show: true, message: "Unknown Error: Empty Response"});
        }
    }

    const FormSubmit = (e) =>
    {
        if (e.currentTarget.checkValidity())
        {
            // Disable button for now
            disableSubmit(true);
            APIPost("/auth/register", form)
                .then(RespRegister)
                .catch(error =>
                {
                    console.log("FormSubmit[catch]: ", error);
                    disableSubmit(false);
                    setError({show: true, message: error});
                });
        }
        else
        {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }
    const SetAttribute = (e) =>
    {
        const field = e.target.name;
        const value = e.target.value;
        setForm({...form, [field]: value });
    }

    const ComparePasswords = (e) =>
    {
        SetPassword2(e.target.value);
        e.target.classList.remove("is-invalid");

        if (e.target.value && form.password !== e.target.value)
        {
            // Tigger the invalid message
            e.target.classList.remove("is-valid");
            e.target.classList.add("is-invalid");
        }
    }

    const CloseModel = () =>
    {
        setError({ show: false, message: '' });
    }

    return (<div>
        <ErrorModal show={error.show} title='Login Response Error' body={error.message} handleClose={CloseModel} />
        <h2 className="text-center my-2">Welcome!</h2>
        <div className="tab-pane" id="register-form" role="tabpanel" aria-labelledby="pills-register-form-tab">
            <Form noValidate validated={validated} onSubmit={FormSubmit}>
                <label className='form-label' htmlFor={auth.user.first_name}>
                    First Name
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='user' /></span>
                    <input id='first_name' className="form-control" type='text' name='first_name' onChange={SetAttribute} placeholder="First Name" required/>
                    <div className="invalid-feedback">
                        Please provide a valid first name.
                    </div>
                </div>
                <label className='form-label' htmlFor={auth.user.last_name}>
                    Last Name
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='user' /></span>
                    <input id='last_name' className="form-control" type='text' name='last_name' onChange={SetAttribute} placeholder="Last Name" required/>
                    <div className="invalid-feedback">
                        Please provide a valid last name.
                    </div>
                </div>
                <label className='form-label' htmlFor={auth.user.phone}>
                    Phone
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='phone' /></span>
                    <input id='phone' className="form-control" type='tel' name='phone' onChange={SetAttribute} placeholder="Phone Number (optional)"/>
                </div>
                <label className='form-label' htmlFor={auth.user.email}>
                    Email
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='at' /></span>
                    <input id='email' className="form-control" type='email' name='email' onChange={SetAttribute} placeholder="Email Address" required pattern=".*@.*\..*"/>
                    <div className="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <label className='form-label' htmlFor={auth.user.password as string}>
                    Password
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='lock' /></span>
                    <input id='password' className="form-control" type='password' name='password' onChange={SetAttribute} placeholder="Password" minLength={8} required/>
                    <div className="invalid-feedback">
                        Please provide a valid password.
                    </div>
                </div>
                <label className='form-label' htmlFor={password2}>
                    Confirm Password
                </label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon='lock' /></span>
                    <input id='password2' className="form-control" type='password' onChange={ComparePasswords} placeholder="Confirm Password" minLength={8} required/>
                    <div className="invalid-feedback">
                        Passwords must match.
                    </div>
                </div>
                <div className="form-group button-group">
                    <button id='submit-btn' className='btn btn-primary form-control' disabled={submitDisabled} type='submit'>Sign Up</button>
                </div>
            </Form>
        </div>
        <div className='alert alert-success'>
            <p className="mb-2">By registering on the site you will have full access to up-to-date and accurate MLS listing information.
            Save the searches you perform or save your favorite listings so you can be notified when new listings
            hit the market or a listing price changes!</p>
            <p className="mb-2">Looking for market information so you can get the best value for your property? Check out our FREE market
            report tool which will provide immediate market details using MLS data.</p>
            <p>Your contact information is never shared or distributed</p>
        </div>
    </div>);
}

/**
 * Form for reseting users password
 * @param any props
 * @returns <ReactElement>
 */
const ResetForm = (props: any) =>
{
    const [validated, setValidated] = useState(false);
    const [submitDisabled, disableSubmit] = useState(false);
    const [email, SetEmail] = useState('');

    const OnSubmit = (e) =>
    {
        const form = e.currentTarget;
        form.checkValidity();
        setValidated(true);
        disableSubmit(true);
        e.preventDefault();
        e.stopPropagation();
    }

    return (<div>
        <div className="tab-pane" id="reset-form">
            <Form className='needs-validation' validated={validated} onSubmit={OnSubmit}>
                <label className='form-label' htmlFor="reset-email">Email Address</label>
                <div className="input-group mb-4">
                    <span className="input-group-text"><FAI icon="at" /></span>
                    <input id='reset-email' className="form-control" type='email' name='email' value={email} onChange={(e) => SetEmail(e.target.value)} placeholder="Enter Email Address" required pattern=".*@.*\..*" />
                    <div className="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <div className="form-group button-group">
                    <button id='reset-btn' className='btn btn-primary form-control' type='submit' disabled={submitDisabled}>Send Reset Link</button>
                </div>
            </Form>
            <div className='helper-text text-center mb-4'>
                Not a member?
                <button id='register-tab2' className="flat mx-1" onClick={() => { props.SelTab("register-tab") }}><b><u>Register</u></b></button>
            </div>
        </div>
    </div>);
}

/**
 * Register Layout
 *
 * @returns <ReactElement>
 */
const Register = () =>
{
    // The desired tab can be passed in via the query string eg: ?tab=login-tab
    const { search } = useLocation();
    let tabs = useMemo(() => new URLSearchParams(search), [search]);
    let default_tab = tabs.get('tab');
    default_tab = default_tab ? default_tab : 'login-tab';

    const [key, setKey] = useState(default_tab);

    const SelectTab = (eventKey) =>
    {
        console.log("Selecting " + eventKey);
        setKey(eventKey);
    }

    // Want to hide the third tab not just disable it
    const css = `.register-container .nav-link.disabled { display: none; }`;
    return (<div className='container register-container'>
        <style>{css}</style>
        <Tabs id="formTab" activeKey={key} className="nav nav-tabs" onSelect={SelectTab}>
            <Tab className="nav-item" eventKey="login-tab" title="Log In">
                <LoginForm SelTab={SelectTab} />
            </Tab>
            <Tab className="nav-item" eventKey="register-tab" title="Register">
                <RegisterForm />
            </Tab>
            <Tab id="hidden-tab" eventKey="reset-tab" title="Reset" disabled>
                <ResetForm SelTab={SelectTab} />
            </Tab>
        </Tabs>
    </div>
    )
}
export default Register;