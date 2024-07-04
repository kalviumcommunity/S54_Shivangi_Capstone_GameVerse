import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';


export const LoginContext = createContext();

/**
 * A React context provider for the login state
 * @typedef {Object} LoginContextValue
 * @property {boolean} isLoggedIn - Whether the user is logged in or not
 * @property {Function} setIsLoggedIn - A function to set the login state
 * @property {Function} logout - A function to log the user out
 */
const LoginContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => null,
    logout: () => null,
});

/**
 * A React component providing the login state to its children components
 * @param {Object} props - The component props
 * @property {React.ReactNode} props.children - The children components
 */
const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * Effect hook to check if the user is logged in when the component mounts
     */
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsLoggedIn(true);
                } else {
                    Cookies.remove('token');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    /**
     * Function to log the user out
     */
    const logout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
