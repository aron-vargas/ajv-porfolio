import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from './LocalStorage';
import NoImg from 'include/images/profile-no-img.png';
import { APIGet } from "include/components/APIRequest";

// ----------------------------------------------------
// Define the User interface and UserType type
// ----------------------------------------------------
interface tokenType
{
    session_id: string;
    token: string;
    expires: string;
    sub: string;
    iat: number,
    alg: string;
}
interface sessionType
{
    session_id : string;
    session_type: string;
    timestamp: string;
}
export interface User
{
    user_id: number | null;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    password: string | null;
    phone: string;
    lastLogin: Date | null;
    isAuthenticated: boolean,
    session: sessionType | null
    user_token: tokenType | null,
}

export type UserType = User | null;

// ----------------------------------------------------
// Define the AuthContext
// ----------------------------------------------------

// emptyUser: try and avoid null userss
export let emptyUser: User = {
    user_id: null,
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    password: null,
    phone: "",
    lastLogin: null,
    isAuthenticated: false,
    session: null,
    user_token: null,
};

/**
 * Create useAuthProvider Component
 * This exposes user, login, logout methods to child components
 * @returns React.Component
 */
const useAuthProvider = () =>
{
    const [ user, setUser ] = useState(emptyUser);
    const [ profileImgSrc, setProfileImgSrc ] = useState(NoImg);
    const { setItem, getItem } = useLocalStorage();

    /**
     * Change user state
     * @param UserType
     * @returns UserType
     */
    const updateUser = (user: UserType) =>
    {
        if (user)
        {
            setUser(user);
            setItem("user", JSON.stringify(user));
            FetchImgSrc(user.user_id);
        }
        else
        {
            setUser(emptyUser);
            setItem("user", JSON.stringify(emptyUser));
            setProfileImgSrc(NoImg);
        }

        return user;
    };

    /**
     * Set user state as an authenticated user
     * @param UserType
     * @returns UserType
     */
    const login = (newUser: User) =>
    {
        newUser.isAuthenticated = true;
        newUser.lastLogin = new Date();
       // newUser.token = "this is my fancy new Token";
        console.log("Successful Login");
        console.log(newUser);
        return updateUser(newUser);
    }

    /**
     * Set user state as an empty user
     * @returns null
     */
    const logout = () =>
    {
        updateUser(null);
        console.log("Logout user is now empty");
        return null;
    }

    const handleAPIRespons = (res) =>
    {
        if (res?.data)
        {
            let src = "data:"
            src += res.headers.getContentType()
            src += ";base64,"
            src += res.data;
            setProfileImgSrc(src)
        }
    }

    const FetchImgSrc = (user_id: number | null) =>
    {
        if (user_id)
        {
            const url = "/users/profile_img?user_id="+user_id;

            // Get the Profile information
            APIGet(url)
                .then(handleAPIRespons)
                .catch(error =>
                {
                    console.log("LoadProfile[catch]: ", error);
                    alert("Error caught trying to GET profile");
                    return NoImg;
                });
        }
    }

    useEffect(() =>
    {
        // First Load look for user in localstorage
        const userStr = getItem('user');
        const newUser = userStr && JSON.parse(userStr);
        if (newUser)
        {
            setUser(newUser);
            FetchImgSrc(newUser.user_id);
        }

    }, [])

    // Expose user, login, logout
    return { user, profileImgSrc, updateUser, login, logout};
}

// Defines the context structure and default "values"
const emptyContext = {
     user: emptyUser,
     profileImgSrc: NoImg,
     updateUser: (newUser: User) => {},
     login: (newUser: User) => {},
     logout: () => {}
}

// Create and exort the Context
export const AuthContext = createContext(emptyContext);

/**
 * Create AuthProvider Component
 * @param React.Component[] | null {chilren}
 * @returns React.Component
 */
export const AuthProvider = ({children}) =>
{
    const auth = useAuthProvider()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;

/**
 * Expose AuthContext
 * @returns React.Context
 */
export const useAuth = () =>
{
    return useContext(AuthContext);
}