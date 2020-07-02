import { useContext, useCallback } from 'react';
import useHttp from '../hooks/useHttp';
import UserContext from '../context/UserContext';

const useFollow = () => {
    const { request } = useHttp();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const updateFollowing = useCallback(
        async (userToFollowId) => {
            try {
                await request(`/api/users/user/follow/${userToFollowId}`);
            } catch (e) {}
        },
        [request],
    );

    const startFollowing = (userToFollowId) => {
        if (currentUser.following.includes(userToFollowId)) {
            setCurrentUser((prev) => ({
                ...prev,
                following: prev.following.filter((id) => id !== userToFollowId),
            }));
            return updateFollowing(userToFollowId);
        }
        setCurrentUser((prev) => ({
            ...prev,
            following: [...prev.following, userToFollowId],
        }));
        updateFollowing(userToFollowId);
    };

    return { startFollowing };
};

export default useFollow;
