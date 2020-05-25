import { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const useAuth = () => {
    const { request, loading } = useHttp();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //const login = useCallback((response) => {
    //    if (response.status === 200) {
    //        return setIsAuthenticated(true);
    //    }
    //    setIsAuthenticated(false);
    //}, []);

    //const logout = useCallback((response) => {
    //    if (response.status === 200) {
    //        return setIsAuthenticated(false);
    //    }
    //    setIsAuthenticated(true);
    //}, []);

    const verifyToken = useCallback(async () => {
        try {
            const response = await request('api/auth/me', 'POST');
            if (response.status !== 401) {
                return setIsAuthenticated(true);
            }
            setIsAuthenticated(false);
        } catch (err) {
            console.error(err);
        }
    }, [request, setIsAuthenticated]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            verifyToken();
        }
        return () => (isSubscribed = false);
    }, [verifyToken]);

    return { isAuthenticated, setIsAuthenticated, loading };
};

export default useAuth;
