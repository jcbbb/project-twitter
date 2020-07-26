import { useState, useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import useHttp from '../hooks/useHttp';

const useMessage = () => {
    const [threads, setThreads] = useState([]);
    const { isAuthenticated } = useContext(UserContext);
    const { request } = useHttp();

    const getThreads = useCallback(async () => {
        try {
            if (!isAuthenticated) return;
            const response = await request('/api/direct/threads', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setThreads(response.threads);
            }
        } catch (e) {}
    }, [request, setThreads, isAuthenticated]);

    const getThread = useCallback((id) => threads.filter((thread) => thread._id === id), [threads]);
    const findExistingThread = (threadList, participants) => {
        let matched;
        const boolArr = threadList.map(
            (threadItem) =>
                threadItem.participants.length === participants.length &&
                threadItem.participants.every((participant) => participants.includes(participant._id)),
        );

        for (let i = 0, len = boolArr.length; i < len; i += 1) {
            if (boolArr[i]) {
                matched = threadList[i];
                break;
            }
        }
        return matched;
    };

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getThreads();
        return () => (isSubscribed = false);
    }, [getThreads]);

    return { threads, getThreads, getThread, setThreads, findExistingThread };
};

export default useMessage;
