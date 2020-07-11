import React, { useContext, forwardRef } from 'react';
import UserContext from '../../context/UserContext';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { messageBoxDecorator } from '../../helpers/decorators';
import { format } from 'date-fns';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorStateReadonly = EditorState.createWithContent(content, messageBoxDecorator);
    return editorStateReadonly;
};

const MessagesBody = ({ messages }, ref) => {
    const { currentUser } = useContext(UserContext);
    return (
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
                                message.sender_id === currentUser._id && 'messageBox__message-container--current'
                            }`}
                        >
                            <div
                                className={`messageBox__message-content ${
                                    message.sender_id === currentUser._id && 'messageBox__message-content--current'
                                }`}
                            >
                                <Editor editorState={convertToEditorState(message.message_text)} readOnly />
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
                <div ref={ref}></div>
            </div>
        </div>
    );
};

export default forwardRef(MessagesBody);
