import { createContext } from 'react';

const UserContext = createContext({
    currentUser: {
        _id: null,
        handle: '',
        name: '',
        bio: '',
        website: '',
        location: '',
        bookmarks: [],
        joined: null,
        followers: [],
        following: [],
        profileImageUrl: null,
        bannerImageUrl: null,
    },
    isAuthenticated: false,
    getCurrentUser: () => {},
    login: () => {},
    logout: () => {},
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
