import { useState, useCallback, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { MessagesContext } from '../context/MessagesContext';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState({});
    const { isAuthenticated, currentUser } = useContext(UserContext);
    const { threads } = useContext(MessagesContext);

    useEffect(() => {
        if (isAuthenticated && currentUser._id) {
            setSocket(io(process.env.REACT_APP_DOMAIN, { query: `userId=${currentUser._id}` }));
        }
    }, [setSocket, isAuthenticated, currentUser._id]);

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
        if (isAuthenticated && threads.length) {
            let threadIds = threads.map((thread) => thread._id);
            subscribe(threadIds);
        }
    }, [subscribe, isAuthenticated, threads]);

    return { socket, subscribe, unsubscribe };
};

export default useSocket;
