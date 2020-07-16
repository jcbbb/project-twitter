import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import useUser from '../hooks/useUser';

const useAuth = () => {
    const { request, loading } = useHttp();
    const { setCurrentUser } = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();

    const login = useCallback(() => {
        setIsAuthenticated(true);
    }, [setIsAuthenticated]);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    const verifyToken = useCallback(async () => {
        try {
            const response = await request('/me', 'GET');
            if (response && response.status !== 401 && response.status !== 500) {
                setCurrentUser((prev) => ({
                    ...prev,
                    ...response.user,
                }));
                setIsAuthenticated(true);
                return history.push('/home');
            }
            setIsAuthenticated(false);
        } catch (e) {}
    }, [request, history]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            verifyToken();
        }
        return () => (isSubscribed = false);
    }, [verifyToken]);

    return { isAuthenticated, loading, login, logout };
};

export default useAuth;
