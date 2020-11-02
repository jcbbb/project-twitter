import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import MessagesCompose from "../messagesCompose/MessagesCompose";
import MessagesBox from "../messagesBox/MessagesBox";
import MessagesList from "../messagesList/MessagesList";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./messages.scss";

const MessagesChatContainer = () => {
  const location = useLocation();
  return (
    <div className="messages__chat">
      <div className="messages__chat-container">
        <div className="messages__new-message">
          <h2 className="messages__new-message-heading">
            You don't have a message selected
          </h2>
          <p className="messages__new-message-sub">
            Choose one from your existing messages, or start a new one
          </p>
          <Link
            to={{
              pathname: "/messages/compose",
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
  const messagesBackground =
    location.state && location.state.messagesBackground;
  const [viewport, setViewport] = useState(0);
  const resize = () => setViewport(window.innerWidth);

  useEffect(() => {
    setViewport(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <div className="messages">
        <Switch location={messagesBackground || location}>
          <Route exact path="/messages/:threadId">
            {viewport > 1000 && <MessagesList />}
            <MessagesBox />
          </Route>
          <Route path="/messages">
            <MessagesList />
            <MessagesChatContainer />
          </Route>
        </Switch>
        {messagesBackground && (
          <Route path="/messages/compose" component={MessagesCompose} />
        )}
      </div>
    </>
  );
};

export default Messages;
