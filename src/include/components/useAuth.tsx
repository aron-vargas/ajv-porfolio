import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from './LocalStorage';

// ----------------------------------------------------
// Define the User interface and UserType type
// ----------------------------------------------------
export interface User
{
    userID: number | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    phone: string;
    lastLogin: Date | null;
    isAuthenticated: boolean,
    token: string | null,
}

export type UserType = User | null;

// ----------------------------------------------------
// Define the AuthContext
// ----------------------------------------------------

// emptyUser: try and avoid null userss
export let emptyUser: User = {
    userID: null,
    firstName: "",
    lastName: "",
    email: "",
    password: null,
    phone: "",
    lastLogin: null,
    isAuthenticated: false,
    token: null,
};

/**
 * Create useAuthProvider Component
 * This exposes user, login, logout methods to child components
 * @returns React.Component
 */
const useAuthProvider = () =>
{
    const [ user, setUser ] = useState(emptyUser);
    const { setItem } = useLocalStorage();

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
        }
        else
        {
            setUser(emptyUser);
            setItem("user", JSON.stringify(emptyUser));
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
        newUser.token = "this is my fancy new Token";
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

    // Expose user, login, logout
    return { user, updateUser, login, logout};
}

// Defines the context structure and default "values"
const emptyContext = {
     user: emptyUser,
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