import React, { createContext } from 'react';
import useSocket from '../hooks/useSocket';
export const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
    const { socket, subscribe, unsubscribe } = useSocket();
    return (
        <SocketContext.Provider
            value={{
                socket,
                subscribe,
                unsubscribe,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
