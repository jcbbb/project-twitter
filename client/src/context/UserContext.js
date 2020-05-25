import { createContext } from 'react';

const UserContext = createContext({
    userId: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export default UserContext;
