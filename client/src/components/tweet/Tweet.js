import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../../assets/icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { compositeDecorator } from '../../helpers/decorators';

import './tweet.scss';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorState = EditorState.createWithContent(content, compositeDecorator);
    return editorState;
};

const Tweet = ({ tweet, tweetUser }) => {
    return (
        <div className="tweet" tabIndex="0">
            <div
                className="tweeter__profile-image-container"
                style={{ backgroundImage: `url(${tweetUser.profile_image_url})` }}
            ></div>
            <div className="tweet__content">
                <div className="tweeter__info">
                    <h2 className="tweeter__info-name" tabIndex="0">
                        {tweetUser.name}
                    </h2>
                    <span className="tweeter__info-handle">{tweetUser.handle}</span>
                    <span className="tweet__dropdown-icon" tabIndex="0">
                        <ChevronIcon />
                    </span>
                </div>
                <div className="tweeter__tweet">
                    <Editor editorState={convertToEditorState(tweet.text)} readOnly />
                </div>
                <div className="tweet__actions">
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-comment" tabIndex="0">
                            <CommentIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.comments || null}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-retweet" tabIndex="0">
                            <RetweetIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.retweets || null}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-heart" tabIndex="0">
                            <HeartIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.likes || null}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-share" tabIndex="0">
                            <ShareIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.shares || null}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
