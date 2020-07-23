import React, { createContext } from 'react';
import useMessage from '../hooks/useMessage';

export const MessagesContext = createContext({
    threads: [],
    getThreads: () => {},
    createThread: () => {},
    getThread: () => {},
});

const MessagesContextProvider = ({ children }) => {
    const { getThreads, threads, createThread, getThread } = useMessage();
    return (
        <MessagesContext.Provider
            value={{
                getThreads,
                threads,
                createThread,
                getThread,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
