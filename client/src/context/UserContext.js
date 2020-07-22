import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

export const UserContext = createContext({
    currentUser: {},
    initialCurrentUserState: {},
    isAuthenticated: false,
    getCurrentUser: () => {},
    login: () => {},
    logout: () => {},
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
});

const UserContextProvider = ({ children }) => {
    const { isAuthenticated, login, logout } = useAuth();
    const { currentUser, getCurrentUser, setCurrentUser } = useUser();
    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                currentUser,
                getCurrentUser,
                setCurrentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
