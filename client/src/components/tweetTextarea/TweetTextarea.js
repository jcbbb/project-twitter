import React, { useState, useContext, useCallback, useEffect, useRef, forwardRef } from 'react';
import Button from '../button/Button';
import useHttp from '../../hooks/useHttp';
import { UserContext } from '../../context/UserContext';
import { TweetsContext } from '../../context/TweetsContext';
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { compositeDecorator } from '../../helpers/decorators';
import { useHistory } from 'react-router-dom';

import './tweetTextarea.scss';
import 'draft-js/dist/Draft.css';

const TWEET_LIMIT = 280;

const TweetTextarea = ({ size, home, composer, ...props }, ref) => {
    const [disabled, setDisabled] = useState(true);
    const { request, loading } = useHttp();
    const { currentUser } = useContext(UserContext);
    const { replyingTweet, setTweets } = useContext(TweetsContext);
    const [images, setImages] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));
    const editorRef = useRef();
    const history = useHistory();

    const handleTweetSubmit = useCallback(async () => {
        let text = '';
        const plaintext = editorState.getCurrentContent().getPlainText();
        if (plaintext.trim()) {
            text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        }
        const formData = new FormData();
        formData.append('folder', 'tweetMedia');
        formData.append('text', text);
        if (Object.keys(replyingTweet).length !== 0) {
            formData.append('in_reply_to_tweet_id', replyingTweet._id);
            formData.append('in_reply_to_user_id', replyingTweet.user._id);
        }
        images.forEach((image) => {
            formData.append(image.file.name, image.file);
        });

        try {
            const response = await request(
                '/api/tweets/tweet/create',
                'POST',
                formData,
                {
                    undefined,
                    credentials: 'include',
                },
                true,
            );
            if (response && response.status === 200 && response.status !== 500) {
                setEditorState((prevState) => EditorState.push(prevState, ContentState.createFromText('')));
                setImages([]);
                editorRef.current.focus();
                setTweets((prevTweets) => [response.tweet, ...prevTweets]);
            }
        } catch (e) {}
    }, [request, editorState, images, replyingTweet, setTweets]);

    const preview = ({ target }) => {
        [...target.files].map((file) => {
            setImages((prev) => [
                ...prev,
                {
                    blob: URL.createObjectURL(file),
                    file,
                },
            ]);
        });
    };

    useEffect(() => {
        images.length >= 1 ? setDisabled(false) : setDisabled(true);
    }, [images]);

    return (
        <>
            <div className="tweet-textarea" {...props}>
                <div className="tweet-textarea__left">
                    <div
                        className="tweet-textarea__profile-image"
                        tabIndex="0"
                        style={{ backgroundImage: `url(${currentUser.profile_image_url})` }}
                    ></div>
                </div>
                <div className={`tweet-textarea__right ${size && `tweet-textarea__right--${size}`}`}>
                    <div className="tweet-textarea__editable">
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            onChange={(editorState) => {
                                const textLength = editorState.getCurrentContent().getPlainText().trim().length;
                                setEditorState(editorState);
                                if (images.length >= 1) {
                                    return setDisabled(false);
                                }
                                setDisabled(textLength > TWEET_LIMIT || textLength < 1 ? true : false);
                            }}
                            placeholder={
                                Object.keys(replyingTweet).length !== 0 ? 'Tweet your reply' : "What's happening"
                            }
                            readOnly={loading}
                        />
                    </div>
                    {images.length > 0 && (
                        <div className="tweet-textarea__image-preview-container">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="tweet-textarea__image-preview"
                                    style={{
                                        backgroundImage: `url(${image.blob})`,
                                        gridRow: index === 1 && images.length === 3 && 'span 2',
                                    }}
                                >
                                    {!loading && (
                                        <span
                                            className="tweet-textarea__image-preview-icon"
                                            onClick={() => {
                                                setImages((prev) => prev.filter(({ blob }) => image.blob !== blob));
                                            }}
                                        >
                                            <CloseIcon />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="tweet-textarea__bottom">
                        <div className="tweet-textarea__bottom--left">
                            <label
                                htmlFor="image-file-input"
                                className={`tweet-textarea__icon ${
                                    (images.length >= 4 || loading) && 'tweet-textarea__icon--disabled'
                                }`}
                                tabIndex="0"
                            >
                                <span className="tweet-textarea__icon-inner" tabIndex="-1">
                                    <ImageIcon />
                                </span>
                            </label>
                            <input
                                id="image-file-input"
                                type="file"
                                className="profileSettings__file-input"
                                onChange={preview}
                                accept="image/png, image/jpeg, image/svg, image/jpg, image/webp"
                                multiple
                            />
                            <span className="tweet-textarea__icon" tabIndex="0">
                                <span className="tweet-textarea__icon-inner" tabIndex="-1">
                                    <GifIcon />
                                </span>
                            </span>
                            <span className="tweet-textarea__icon" tabIndex="0">
                                <span className="tweet-textarea__icon-inner" tabIndex="-1">
                                    <SmileIcon />
                                </span>
                            </span>
                        </div>
                        <div className={`tweet-textarea__button ${home ? 'tweet-textarea__button-home' : null}`}>
                            <Button
                                styleType="filled"
                                fit
                                size="md"
                                disabled={loading || disabled}
                                ref={ref}
                                onClick={() => {
                                    handleTweetSubmit();
                                    Object.keys(replyingTweet).length !== 0 || (composer && history.goBack());
                                }}
                            >
                                {Object.keys(replyingTweet).length !== 0 ? 'Reply' : 'Tweet'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default forwardRef(TweetTextarea);
