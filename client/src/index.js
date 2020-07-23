import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SocketContextProvider from './context/SocketContext';
import UserContextProvider from './context/UserContext';
import TweetsContextProvider from './context/TweetsContext';
import MessagesContextProvider from './context/MessagesContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <UserContextProvider>
                <TweetsContextProvider>
                    <MessagesContextProvider>
                        <SocketContextProvider>
                            <App />
                        </SocketContextProvider>
                    </MessagesContextProvider>
                </TweetsContextProvider>
            </UserContextProvider>
        </React.StrictMode>
    </Router>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
