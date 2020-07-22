import React, { createContext } from 'react';
import useMessage from '../hooks/useMessage';

export const MessagesContext = createContext({
    threads: [],
    getThreads: () => {},
    createThread: () => {},
    selectedParticpants: [],
    setSelectedParticipants: () => {},
});

const MessagesContextProvider = ({ children }) => {
    const { getThreads, threads, createThread } = useMessage();
    return (
        <MessagesContext.Provider
            value={{
                getThreads,
                threads,
                createThread,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
