import React from 'react';
import UserContext from './context/UserContext';
import useAuth from './hooks/useAuth';
import useRoutes from './hooks/useRoutes';
import useUser from './hooks/useUser';
import Loader from './components/loader/Loader';
import './app.scss';

const App = () => {
    const { loading, isAuthenticated, login, logout } = useAuth();
    const { user, getUser, fetchTweets, tweets, tweetUser, tweetsLoading } = useUser();
    const routes = useRoutes(isAuthenticated);
    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                user,
                getUser,
                fetchTweets,
                tweets,
                tweetUser,
                tweetsLoading,
            }}
        >
            {loading ? <Loader /> : <div className="wrapper">{routes}</div>}
        </UserContext.Provider>
    );
};

export default App;
