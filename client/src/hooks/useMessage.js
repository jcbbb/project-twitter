import { useState, useCallback, useContext, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const useMessage = () => {
    const [threads, setThreads] = useState([]);
    const { currentUser, isAuthenticated } = useContext(UserContext);
    const { request } = useHttp();
    const history = useHistory();

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

    const createThread = useCallback(
        async (participants) => {
            try {
                participants.push(currentUser);
                const participantsIds = participants.map((user) => user._id);
                const existingThread = findExistingThread(threads, participantsIds);
                if (!existingThread) {
                    const response = await request('/api/direct/thread/new', 'POST', {
                        participants: participantsIds,
                    });
                    if (response && response.status === 200 && response.status !== 500) {
                        return history.push(`/messages/${response.thread._id}`);
                    }
                }

                history.push(`/messages/${existingThread._id}`);
            } catch (e) {}
        },
        [threads, history, request, currentUser],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getThreads();
        return () => (isSubscribed = false);
    }, [getThreads]);

    return { threads, getThreads, createThread, getThread };
};

export default useMessage;
