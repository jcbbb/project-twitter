import React from 'react';
import useAuth from './hooks/useAuth';
import useRoutes from './hooks/useRoutes';
import TwitterLogo from './assets/images/twitter192.png';

import './app.scss';

const App = () => {
    const { loading } = useAuth();
    const routes = useRoutes();

    return (
        <>
            {loading ? (
                <div className="backdrop" style={{ background: 'transparent' }}>
                    <img src={TwitterLogo} style={{ width: '72px' }} alt="Twitter Logo" />
                </div>
            ) : (
                <div className="wrapper">{routes}</div>
            )}
        </>
    );
};

export default App;
