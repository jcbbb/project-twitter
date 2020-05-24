import React from 'react';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/useAuth';
import useRoutes from './hooks/useRoutes';
import Loader from './components/loader/Loader';
import './app.scss';

const App = () => {
    const { login, isAuthenticated, loading, logout } = useAuth();
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider
            value={{
                login,
                isAuthenticated,
                logout,
            }}
        >
            {loading ? <Loader /> : <div className="wrapper">{routes}</div>}
        </AuthContext.Provider>
    );
};

export default App;
