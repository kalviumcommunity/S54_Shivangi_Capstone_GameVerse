import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';


export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
