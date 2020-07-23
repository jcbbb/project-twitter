import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import useHttp from '../../hooks/useHttp';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import { MessagesContext } from '../../context/MessagesContext';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { formatName } from '../../helpers/formatName';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { compositeDecorator, messageBoxDecorator } from '../../helpers/decorators';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import { ReactComponent as PlaneIcon } from '../../assets/icons/plane.svg';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';

import './messagesBox.scss';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorStateReadonly = EditorState.createWithContent(content, messageBoxDecorator);
    return editorStateReadonly;
};

const MessagesBox = () => {
    const [messages, setMessages] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));
    const [disabled, setDisabled] = useState(true);
    const [offsetHeight, setOffsetHeight] = useState();
    const { currentUser } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const { getThread } = useContext(MessagesContext);
    const { request } = useHttp();
    const [thread, setThread] = useState({});
    const history = useHistory();
    const footerRef = useRef(null);
    const messagesRef = useRef(null);
    const editorRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        setThread(...getThread(params.threadId));
    }, [params.threadId]);

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('thread message', (data) => {
                setMessages((prev) => [...prev, data]);
            });
        }
    }, [socket]);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { offsetHeight } = entries[0].target;
            setOffsetHeight(offsetHeight);
        }),
    );

    const getMessages = useCallback(
        async (id) => {
            try {
                const response = await request(`/api/direct/messages?threadId=${id}`, 'GET');
                if (response && response.status === 200 && response.status !== 500) {
                    setMessages(response.messages);
                }
            } catch (e) {}
        },
        [request, socket],
    );

    const sendMessage = useCallback(async () => {
        try {
            const message_text = editorState.getCurrentContent().getPlainText();
            const draft_message_text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            setEditorState((prevState) => EditorState.push(prevState, ContentState.createFromText('')));
            await request('/api/direct/message/new', 'POST', {
                threadId: params.threadId,
                draft_message_text,
                message_text,
            });
            editorRef.current.focus();
        } catch (e) {}
    }, [request, editorState, params.threadId]);

    useEffect(() => {
        const footerRefCurrent = footerRef.current;
        const observerCurrent = observer.current;
        if (footerRef.current) observerCurrent.observe(footerRef.current);
        return () => {
            observerCurrent.unobserve(footerRefCurrent);
        };
    }, [footerRef, observer]);

    useEffect(() => {
        messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [offsetHeight, messages]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getMessages(params.threadId);
        return () => (isSubscribed = false);
    }, [getMessages, params.threadId]);

    return (
        <div className="messages__chat">
            <div className="messageBox" style={{ paddingBottom: `${offsetHeight}px` }}>
                <div className="messageBox__header">
                    <div className="messageBox__header--left">
                        <div className="messageBox__header-icon messageBox__header-icon-back" tabIndex="0">
                            <span
                                className="messageBox__header-icon-inner"
                                tabIndex="-1"
                                onClick={() => history.goBack()}
                            >
                                <BackArrowIcon />
                            </span>
                        </div>
                        <div classsName="messageBox__header-info">
                            <h2 className="messageBox__header-name">
                                {thread &&
                                    Object.keys(thread).length !== 0 &&
                                    formatName(thread.participants, currentUser)}
                            </h2>
                            {thread && Object.keys(thread).length !== 0 && thread.participants < 2 && (
                                <span className="messageBox__header-handle">{thread.participants[0].handle}</span>
                            )}
                        </div>
                    </div>
                    <div className="messageBox__header-icon" tabIndex="0">
                        <div className="messageBox__header-icon-inner" tabIndex="-1">
                            <InfoIcon />
                        </div>
                    </div>
                </div>
                <div className="messageBox__body relative">
                    <div className="messageBox__messages">
                        {messages.map((message, index) => (
                            <div
                                className={`messageBox__message ${
                                    message.sender_id === currentUser._id && 'messageBox__message--current'
                                }`}
                                key={index}
                            >
                                {message.sender_id !== currentUser._id && (
                                    <div className="messageBox__message-author-image"></div>
                                )}
                                <div
                                    className={`messageBox__message-container ${
                                        message.sender_id === currentUser._id &&
                                        'messageBox__message-container--current'
                                    }`}
                                >
                                    <div
                                        className={`messageBox__message-content ${
                                            message.sender_id === currentUser._id &&
                                            'messageBox__message-content--current'
                                        }`}
                                    >
                                        <Editor
                                            editorState={convertToEditorState(message.draft_message_text)}
                                            readOnly
                                        />
                                    </div>
                                    <span
                                        className={`messageBox__message-date ${
                                            message.sender_id === currentUser._id && 'messageBox__message-date--current'
                                        }`}
                                    >
                                        {format(new Date(message.createdAt), 'MMM dd, yyyy, KK:mm a')}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesRef}></div>
                    </div>
                </div>
                <div className="messageBox__footer" ref={footerRef}>
                    <div className="messageBox__footer-icon" tabIndex="0">
                        <div className="messageBox__footer-icon-inner" tabIndex="-1">
                            <ImageIcon />
                        </div>
                    </div>
                    <div className="messageBox__footer-icon" tabIndex="0">
                        <div className="messageBox__footer-icon-inner" tabIndex="-1">
                            <GifIcon />
                        </div>
                    </div>
                    <div className="messageBox__footer-input-group">
                        <div className="messageBox__footer-input">
                            <Editor
                                ref={editorRef}
                                editorState={editorState}
                                onChange={(editorState) => {
                                    const textLength = editorState.getCurrentContent().getPlainText().length;
                                    setDisabled(textLength < 1 ? true : false);
                                    setEditorState(editorState);
                                }}
                                placeholder="Start a new message"
                            />
                        </div>
                        <div className="messageBox__footer-icon messageBox__footer-input-icon" tabIndex="0">
                            <div
                                className="messageBox__footer-input-icon-inner messageBox__footer-icon-inner"
                                tabIndex="-1"
                            >
                                <SmileIcon />
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={sendMessage}
                        className={`messageBox__footer-icon ${disabled && 'messageBox__footer-icon--disabled'}`}
                        tabIndex="0"
                    >
                        <div className="messageBox__footer-icon-inner" tabIndex="-1">
                            <PlaneIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesBox;
