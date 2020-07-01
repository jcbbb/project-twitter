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
    tweets: [],
    isAuthenticated: false,
    getCurrentUser: () => {},
    fetchTweets: () => {},
    setTweets: () => {},
    login: () => {},
    logout: () => {},
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
