import { createContext } from 'react';

const UserContext = createContext({
    currentUser: {
        userId: null,
        handle: null,
        name: null,
        bio: null,
        website: null,
        location: null,
        joined: null,
        followers: [],
        following: [],
        profileImageUrl: null,
        bannerImageUrl: null,
    },
    tweetUser: null,
    tweets: null,
    isAuthenticated: false,
    getCurrentUser: () => {},
    fetchTweets: () => {},
    login: () => {},
    logout: () => {},
    setCurrentUser: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
