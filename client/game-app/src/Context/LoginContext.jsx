import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
