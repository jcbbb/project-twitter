import { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { useHistory } from 'react-router-dom';

const useMessage = () => {
    const [threads, setThreads] = useState([]);
    const [selectedParticpants, setSelectedParticipants] = useState([]);
    const { request } = useHttp();
    const history = useHistory();

    const getThreads = useCallback(async () => {
        try {
            const response = await request('/api/direct/threads', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setThreads(response.threads);
            }
        } catch (e) {}
    }, [request, setThreads]);

    // TODO: Current set of selectedParticpants is one short of current user. Should fix it tomorrow!
    const findExistingThread = (threadList, participants) => {
        console.log(threadList, participants);
        let matched;
        const boolArr = threadList.map(
            (threadItem) =>
                threadItem.participants.length === participants.length &&
                threadItem.participants.every((participant) => participants.includes(participant)),
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
                const participantsIds = participants.map((user) => user._id);
                const existingThread = findExistingThread(threads, participantsIds);
                console.log(existingThread);
                if (existingThread) {
                    return history.push(`/messages/${existingThread._id}`);
                }
                const response = await request('/api/direct/thread/new', 'POST', {
                    participants: participantsIds,
                });

                if (response && response.status === 200 && response.status !== 500) {
                    history.push(`/messages/${response.thread._id}`);
                }
            } catch (e) {}
        },
        [threads, history, request],
    );
    return { threads, getThreads, createThread, findExistingThread };
};

export default useMessage;
