import { createContext } from 'react';

const MessagesContext = createContext({
    threads: [
        {
            id: '',
            initiatedBy: '',
            participants: [],
        },
    ],
    createNewThread: () => {},
    selectedParticpants: [],
    setSelectedParticipants: () => {},
});

export default MessagesContext;
