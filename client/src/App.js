import React from 'react';
import UserContext from './context/UserContext';
import useAuth from './hooks/useAuth';
import useRoutes from './hooks/useRoutes';
import useUser from './hooks/useUser';
import TwitterLogo from './assets/images/twitter192.png';
import './app.scss';

const App = () => {
    const { loading, isAuthenticated, login, logout } = useAuth();
    const {
        currentUser,
        getCurrentUser,
        setCurrentUser,
        fetchTweets,
        tweets,
        tweetUser,
        tweetsLoading,
    } = useUser();
    const routes = useRoutes(isAuthenticated);
    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                currentUser,
                getCurrentUser,
                fetchTweets,
                tweets,
                tweetUser,
                tweetsLoading,
                setCurrentUser,
            }}
        >
            {loading ? (
                <div className="backdrop" style={{ background: 'transparent' }}>
                    <img src={TwitterLogo} style={{ width: '72px' }} />
                </div>
            ) : (
                <div className="wrapper">{routes}</div>
            )}
        </UserContext.Provider>
    );
};

export default App;
