import React, { useState } from 'react';
import ProfileImage from '../../assets/images/profile.jpg';
import Button from '../button/Button';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';
import { ReactComponent as GifIcon } from '../../assets/icons/gif.svg';
import { ReactComponent as SmileIcon } from '../../assets/icons/smile.svg';
import './tweetTextarea.scss';

const TweetTextarea = () => {
    const [disabled, setDisabled] = useState(true);

    return (
        <>
            <div className="tweet-textarea">
                <div className="tweet-textarea__profile-image" tabIndex="0">
                    <img src={ProfileImage} />
                </div>
                <div className="tweet-textarea__right">
                    <div
                        className="tweet-textarea__editable"
                        placeholder="What's happening?"
                        contentEditable="true"
                        onInput={({ target }) => {
                            if (!target.innerText.trim().length) {
                                target.innerText = '';
                            } else if (target.innerText.length >= 1) {
                                return setDisabled(false);
                            }
                            setDisabled(true);
                        }}
                    ></div>
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
                            disabled={disabled}
                            tabIndex="0"
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
