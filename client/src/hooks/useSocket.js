import { useState, useCallback, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { MessagesContext } from '../context/MessagesContext';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState({});
    const { currentUser, isAuthenticated } = useContext(UserContext);
    const { threads } = useContext(MessagesContext);

    useEffect(() => {
        if (isAuthenticated) {
            setSocket(io(process.env.REACT_APP_DOMAIN));
        }
    }, [setSocket, isAuthenticated]);

    const subscribe = useCallback(
        (ids) => {
            if (Object.keys(socket).length !== 0) {
                socket.emit('subscribe', { ids });
            }
        },
        [socket],
    );

    const unsubscribe = useCallback(async () => {}, []);

    useEffect(() => {
        if (isAuthenticated && currentUser.following.length > 0) {
            subscribe(currentUser.following);
        }
    }, [currentUser.following, subscribe, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && threads.length) {
            let threadIds = threads.map((thread) => thread._id);
            subscribe(threadIds);
        }
    }, [subscribe, isAuthenticated, threads]);

    return { socket, subscribe, unsubscribe };
};

export default useSocket;
