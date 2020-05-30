import { createContext } from 'react';

const UserContext = createContext({
    user: {
        userId: null,
        handle: null,
        name: null,
        profileImageUrl: null,
    },
    isAuthenticated: false,
    getUser: () => {},
    login: () => {},
    logout: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
