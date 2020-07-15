import React from 'react';
import UserContext from './context/UserContext';
import TweetsContext from './context/TweetsContext';
import useAuth from './hooks/useAuth';
import useRoutes from './hooks/useRoutes';
import useUser from './hooks/useUser';
import useTweets from './hooks/useTweets';
import TwitterLogo from './assets/images/twitter192.png';

import './app.scss';

const App = () => {
    const { loading, isAuthenticated, login, logout } = useAuth();
    const { currentUser, getCurrentUser, setCurrentUser } = useUser();
    const {
        tweets,
        tweetsLoading,
        setTweets,
        fetchTweets,
        replyingTweet,
        tweet,
        setTweet,
        getTweet,
        destroy,
        setReplyingTweet,
    } = useTweets();
    const routes = useRoutes(isAuthenticated);
    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                currentUser,
                getCurrentUser,
                setCurrentUser,
            }}
        >
            <TweetsContext.Provider
                value={{
                    fetchTweets,
                    setTweets,
                    tweets,
                    tweetsLoading,
                    replyingTweet,
                    setReplyingTweet,
                    tweet,
                    setTweet,
                    getTweet,
                    destroy,
                }}
            >
                {loading ? (
                    <div className="backdrop" style={{ background: 'transparent' }}>
                        <img src={TwitterLogo} style={{ width: '72px' }} alt="Twitter Logo" />
                    </div>
                ) : (
                    <div className="wrapper">{routes}</div>
                )}
            </TweetsContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
