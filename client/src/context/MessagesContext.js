import React, { createContext } from 'react';
import useMessage from '../hooks/useMessage';

export const MessagesContext = createContext({
    threads: [],
    getThreads: () => {},
    getThread: () => {},
    setThreads: () => {},
    findExistingThread: () => {},
});

const MessagesContextProvider = ({ children }) => {
    const { getThreads, threads, getThread, setThreads, findExistingThread } = useMessage();
    return (
        <MessagesContext.Provider
            value={{
                getThreads,
                threads,
                getThread,
                setThreads,
                findExistingThread,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
