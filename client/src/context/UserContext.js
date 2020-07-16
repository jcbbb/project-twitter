import { createContext } from 'react';

const UserContext = createContext({
    currentUser: {
        _id: '',
        handle: '',
        name: '',
        bio: '',
        website: '',
        location: '',
        bookmarks: [],
        joined: null,
        followers: [],
        following: [],
        profile_image_url: null,
        banner_image_url: null,
    },
    isAuthenticated: false,
    getCurrentUser: () => {},
    login: () => {},
    logout: () => {},
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
