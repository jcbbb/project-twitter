import React, { useState, useContext, useCallback } from 'react';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import { compositeDecorator } from '../../helpers/decorators';
import './tweetTextarea.scss';
import 'draft-js/dist/Draft.css';

const TWEET_LIMIT = 280;

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
            });
            if (response && response.status === 200 && response.status !== 500) {
                setEditorState(() => EditorState.createEmpty(compositeDecorator));
            }
        } catch (e) {}
    }, [request, editorState]);

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
                            style={{ padding: '9px 14px' }}
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
