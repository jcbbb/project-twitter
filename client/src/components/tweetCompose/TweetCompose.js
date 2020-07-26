import React, { useContext, useRef } from 'react';
import Backdrop from '../backdrop/Backdrop';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import Button from '../button/Button';
import Tweet from '../tweet/Tweet';
import { TweetsContext } from '../../context/TweetsContext';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './tweetCompose.scss';

const TweetCompose = () => {
    const history = useHistory();
    const { replyingTweet, setReplyingTweet } = useContext(TweetsContext);
    const tweetSubmitRef = useRef();
    return (
        <Backdrop style={{ alignItems: 'flex-start' }}>
            <div className="tweetCompose">
                <div className="tweetCompose__header">
                    <div className="tweetCompose__header-icon">
                        <div
                            className="tweetCompose__header-icon-inner"
                            onClick={() => {
                                history.goBack();
                                setReplyingTweet({});
                            }}
                        >
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="tweetCompose__header-button">
                        <Button styleType="filled" size="sm" fit onClick={() => tweetSubmitRef.current.click()}>
                            {Object.keys(replyingTweet).length !== 0 ? 'Reply' : 'Tweet'}
                        </Button>
                    </div>
                </div>
                {Object.keys(replyingTweet).length !== 0 && (
                    <Tweet tweet={replyingTweet} hasActions={false} hasMedia={false} replying={true} />
                )}
                <TweetTextarea ref={tweetSubmitRef} size="lg" style={{ paddingTop: '0' }} />
            </div>
        </Backdrop>
    );
};

export default TweetCompose;
