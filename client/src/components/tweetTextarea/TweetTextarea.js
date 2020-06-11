import React, { useState, useContext, useCallback } from 'react';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import { Editor, EditorState, CompositeDecorator, convertToRaw, convertFromRaw } from 'draft-js';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import './tweetTextarea.scss';
import 'draft-js/dist/Draft.css';

const HANDLE_REGEX = /@(\w+)/g;
const URL_REGEX = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi;
const HASHTAG_REGEX = /#(\w+)/g;
const TWEET_LIMIT = 280;

const handleSpan = React.memo(({ children, offsetKey }) => (
    <span data-offset-key={offsetKey} style={{ color: 'rgb(29, 161, 242)' }}>
        {children}
    </span>
));
const hashtagSpan = React.memo(({ children, offsetKey }) => (
    <span data-offset-key={offsetKey} style={{ color: 'rgb(29, 161, 242)' }}>
        {children}
    </span>
));
const urlSpan = React.memo(({ children, offsetKey, decoratedText }) => (
    <a data-offset-key={offsetKey} href={decoratedText} style={{ color: 'rgb(29, 161, 242)' }}>
        {children}
    </a>
));
const overflowSpan = React.memo(({ children }) => <span style={{ background: 'rgb(224, 36, 94)' }}>{children}</span>);

const findWithRegex = (regex, contentBlock, cb) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        cb(start, start + matchArr[0].length);
    }
};

const handleStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(HANDLE_REGEX, contentBlock, cb);
};
const hashtagStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, cb);
};
const urlStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(URL_REGEX, contentBlock, cb);
};
const overflowStrategy = (contentBlock, cb) => {
    const textLength = contentBlock.getLength();
    if (textLength > TWEET_LIMIT) cb(TWEET_LIMIT, textLength);
};

const compositeDecorator = new CompositeDecorator([
    {
        strategy: overflowStrategy,
        component: overflowSpan,
    },
    {
        strategy: handleStrategy,
        component: handleSpan,
    },
    {
        strategy: hashtagStrategy,
        component: hashtagSpan,
    },
    {
        strategy: urlStrategy,
        component: urlSpan,
    },
]);

const TweetTextarea = () => {
    const [disabled, setDisabled] = useState(true);
    const { request, loading } = useHttp();
    const { currentUser } = useContext(UserContext);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));

    const handleTweetSubmit = useCallback(async () => {
        try {
            const tweet = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            const response = await request('/api/tweets/tweet/create', 'POST', {
                tweet,
                userId: currentUser.userId,
            });
            if (response && response.status === 200 && response.status !== 500) {
                setEditorState(() => EditorState.createEmpty(compositeDecorator));
            }
        } catch (e) {}
    }, [request, currentUser.userId]);

    return (
        <>
            <div className="tweet-textarea">
                <div
                    className="tweet-textarea__profile-image"
                    tabIndex="0"
                    style={{ backgroundImage: `url(${currentUser.profileImageUrl})` }}
                ></div>
                <div className="tweet-textarea__right">
                    <Editor
                        editorState={editorState}
                        onChange={(editorState) => {
                            const contentState = editorState.getCurrentContent();
                            const textLength = editorState.getCurrentContent().getPlainText().length;
                            setDisabled(textLength > TWEET_LIMIT || textLength < 1 ? true : false);
                            setEditorState(editorState);
                        }}
                        className="tweet-textarea__editable"
                        placeholder="What's happening?"
                    />
                    <div className="tweet-textarea__bottom">
                        <div className="tweet-textarea__bottom--left">
                            <span className="tweet-textarea__icon" tabIndex="0">
                                <ImageIcon />
                            </span>
                            <span className="tweet-textarea__icon" tabIndex="0">
                                <GifIcon />
                            </span>
                            <span className="tweet-textarea__icon" tabIndex="0">
                                <SmileIcon />
                            </span>
                        </div>
                        <Button
                            className="button__filled tweet-textarea__btn"
                            style={{ padding: '8px 14px' }}
                            disabled={loading || disabled}
                            tabIndex="0"
                            onClick={handleTweetSubmit}
                        >
                            Tweet
                        </Button>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
};

export default TweetTextarea;
