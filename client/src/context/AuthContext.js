import { createContext } from 'react';

const AuthContext = createContext({
    token: null,
    userId: null,
    login: null,
    logout: null,
    isAuthenticated: false,
});

export default AuthContext;
