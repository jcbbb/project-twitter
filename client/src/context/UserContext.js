import { createContext } from 'react';

const UserContext = createContext({
    user: {
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
    },
    tweetUser: null,
    tweets: null,
    isAuthenticated: false,
    getUser: () => {},
    fetchTweets: () => {},
    login: () => {},
    logout: () => {},
    setIsAuthenticated: () => {},
});

export default UserContext;
