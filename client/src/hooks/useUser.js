import { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const useUser = () => {
    const [user, setUser] = useState({
        userId: null,
        name: null,
        handle: null,
        profileImageUrl: null,
    });
    const { request } = useHttp();

    const getUser = useCallback(async () => {
        try {
            const response = await request('/api/users/user/profile', 'GET');
            if (response.status === 200 && response.status !== 500) {
                return setUser(response.user);
            }
            setUser((prev) => ({ ...prev }));
        } catch (e) {}
    }, [request, setUser]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getUser();
        }
        return () => (isSubscribed = false);
    }, [getUser]);

    return { getUser, user };
};

export default useUser;
