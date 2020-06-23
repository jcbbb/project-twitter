import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';
import { compositeDecorator } from '../../helpers/decorators';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import { ReactComponent as PlaneIcon } from '../../assets/icons/plane.svg';
import './messagesBox.scss';

const MessagesBox = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));
    const [disabled, setDisabled] = useState(true);
    const [offsetHeight, setOffsetHeight] = useState();
    const footerRef = useRef(null);
    const messagesRef = useRef(null);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { offsetHeight } = entries[0].target;
            setOffsetHeight(offsetHeight);
        }),
    );

    useEffect(() => {
        if (footerRef.current) observer.current.observe(footerRef.current);
        return () => {
            observer.current.unobserve(footerRef.current);
        };
    }, [footerRef, observer]);
    useEffect(() => {
        messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [offsetHeight]);

    return (
        <div className="messageBox" style={{ paddingBottom: `${offsetHeight}px` }}>
            <div className="messageBox__header">
                <div className="messageBox__header--left">
                    <h2 className="messageBox__header-name">Gary Simon</h2>
                    <span className="messageBox__header-handle">@designcoursecom</span>
                </div>
                <span className="messageBox__header-icon">
                    <InfoIcon />
                </span>
            </div>
            <div className="messageBox__body">
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message">
                    <div className="messageBox__message-author-image"></div>
                    <div className="messageBox__message-container">
                        <div className="messageBox__message-content">
                            <p>
                                Thanks. I just sent Scrimba your info. I will let you know as soon as they add the
                                course to your account.
                            </p>
                        </div>
                        <span className="messageBox__message-date">Apr 30, 2020, 06:10 PM</span>
                    </div>
                </div>
                <div className="messageBox__message messageBox__message--current" ref={messagesRef}>
                    <div className="messageBox__message-container messageBox__message-container--current">
                        <div className="messageBox__message-content messageBox__message-content--current">
                            <p>Yayyyy... I will get started then.</p>
                        </div>
                        <span className="messageBox__message-date messageBox__message-date--current">
                            Apr 30, 2020, 06:10 PM
                        </span>
                    </div>
                </div>
            </div>
            <div className="messageBox__footer" ref={footerRef}>
                <span className="messageBox__footer-icon">
                    <ImageIcon />
                </span>
                <span className="messageBox__footer-icon">
                    <GifIcon />
                </span>
                <div className="messageBox__footer-input-group">
                    <Editor
                        editorState={editorState}
                        onChange={(editorState) => {
                            const textLength = editorState.getCurrentContent().getPlainText().length;
                            setDisabled(textLength < 1 ? true : false);
                            setEditorState(editorState);
                        }}
                        placeholder="Start a new message"
                        className="messageBox__footer-input"
                    />
                    <span className="messageBox__footer-icon messageBox__footer-input-icon">
                        <SmileIcon />
                    </span>
                </div>
                <span className={`messageBox__footer-icon ${disabled && 'messageBox__footer-icon--disabled'}`}>
                    <PlaneIcon />
                </span>
            </div>
        </div>
    );
};

export default MessagesBox;
