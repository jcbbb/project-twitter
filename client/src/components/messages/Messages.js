import React from 'react';
import Button from '../button/Button';
import MessagesCompose from '../messagesCompose/MessagesCompose';
import MessagesBox from '../messagesBox/MessagesBox';
import MessagesList from '../messagesList/MessagesList';
import { ReactComponent as ComposeMessageIcon } from '../../assets/icons/compose-message.svg';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import './messages.scss';

const MessagesChatContainer = () => {
    const location = useLocation();
    return (
        <div className="messages__chat">
            <div className="messages__chat-container">
                <div className="messages__new-message">
                    <h2 className="messages__new-message-heading">You don't have a message selected</h2>
                    <p className="messages__new-message-sub">
                        Choose one from your existing messages, or start a new one
                    </p>
                    <Link
                        to={{
                            pathname: '/messages/compose',
                            state: { messagesBackground: location },
                        }}
                    >
                        <Button styleType="filled" size="md">
                            New message
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Messages = () => {
    const location = useLocation();
    const messagesBackground = location.state && location.state.messagesBackground;
    return (
        <>
            <div className="messages">
                <Switch location={messagesBackground || location}>
                    <Route exact path="/messages/:threadId">
                        <MessagesList />
                        <MessagesBox />
                    </Route>
                    <Route path="/messages">
                        <MessagesList />
                        <MessagesChatContainer />
                    </Route>
                </Switch>
                {messagesBackground && <Route path="/messages/compose" component={MessagesCompose} />}
                <div className="tweet-fixed-button">
                    <Link
                        to={{
                            pathname: '/messages/compose',
                            state: { messagesBackground: location },
                        }}
                    >
                        <Button
                            size="lg"
                            styleType="filled button__round button__round--lg"
                            icon={<ComposeMessageIcon />}
                        ></Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Messages;
