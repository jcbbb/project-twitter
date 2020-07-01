import React from 'react';
import Button from '../button/Button';
import MessagesCompose from '../messagesCompose/MessagesCompose';
import MessagesBox from '../messagesBox/MessagesBox';
import MessagesList from '../messagesList/MessagesList';
import { Link, Route, Switch } from 'react-router-dom';
import './messages.scss';

const routes = [
    {
        path: '/messages',
        exact: true,
        messagesList: () => <MessagesList />,
        main: () => <MessagesChatContainer />,
    },
    {
        path: '/messages/:threadId',
        exact: true,
        messagesList: () => <MessagesList />,
        main: () => <MessagesBox />,
    },
];

const MessagesChatContainer = () => (
    <div className="messages__chat-container">
        <div className="messages__new-message">
            <h2 className="messages__new-message-heading">You don't have a message selected</h2>
            <p className="messages__new-message-sub">Choose one from your existing messages, or start a new one</p>
            <Link to="/messages/compose">
                <Button styleType="filled" size="md">
                    New message
                </Button>
            </Link>
        </div>
    </div>
);

const Messages = () => {
    return (
        <>
            <div className="messages">
                <Route exact path="/messages/compose">
                    <MessagesCompose />
                </Route>
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            {route.messagesList}
                        </Route>
                    ))}
                </Switch>
                <div className="messages__chat">
                    <Switch>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} exact={route.exact}>
                                {route.main}
                            </Route>
                        ))}
                    </Switch>
                </div>
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            {route.messagesCompose}
                        </Route>
                    ))}
                </Switch>
            </div>
        </>
    );
};

export default Messages;
