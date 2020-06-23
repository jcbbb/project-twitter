import { createContext } from 'react';

const MessagesContext = createContext({
    threads: [
        {
            id: '',
            initiatedBy: '',
            members: [],
        },
    ],
    selectedUsers: [],
    setSelectedUsers: () => {},
});

export default MessagesContext;
