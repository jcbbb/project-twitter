import React, { useState, useContext, useCallback, useEffect } from 'react';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { compositeDecorator } from '../../helpers/decorators';

import './tweetTextarea.scss';
import 'draft-js/dist/Draft.css';

const TWEET_LIMIT = 280;

const TweetTextarea = () => {
    const [disabled, setDisabled] = useState(true);
    const { request, loading } = useHttp();
    const { currentUser } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(compositeDecorator));

    const handleTweetSubmit = useCallback(async () => {
        const tweet = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const formData = new FormData();
        formData.append('folder', 'tweetMedia');
        formData.append('tweet', tweet);
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
                setEditorState(() => EditorState.createEmpty(compositeDecorator));
                setImages([]);
            }
        } catch (e) {}
    }, [request, editorState, images]);

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
            <div className="tweet-textarea">
                <div
                    className="tweet-textarea__profile-image"
                    tabIndex="0"
                    style={{ backgroundImage: `url(${currentUser.profile_image_url})` }}
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
                                    <span
                                        className="tweet-textarea__image-preview-icon"
                                        onClick={() => {
                                            setImages((prev) => prev.filter(({ blob }) => image.blob !== blob));
                                        }}
                                    >
                                        <CloseIcon />
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="tweet-textarea__bottom">
                        <div className="tweet-textarea__bottom--left">
                            <label
                                htmlFor="image-file-input"
                                className={`tweet-textarea__icon ${
                                    images.length >= 4 && 'tweet-textarea__icon--disabled'
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
                        <Button
                            styleType="filled"
                            fit
                            size="md"
                            disabled={loading || disabled}
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
