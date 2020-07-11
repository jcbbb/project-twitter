import React, { useContext } from 'react';
import Backdrop from '../backdrop/Backdrop';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import TweetsContext from '../../context/TweetsContext';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './tweetCompose.scss';

const TweetCompose = () => {
    const history = useHistory();
    const { replyingTweetId, setReplyingTweetId } = useContext(TweetsContext);
    return (
        <Backdrop style={{ alignItems: 'flex-start' }}>
            <div className="tweetCompose">
                <div className="tweetCompose__header">
                    <div className="tweetCompose__header-icon">
                        <div
                            className="tweetCompose__header-icon-inner"
                            onClick={() => {
                                history.goBack();
                                setReplyingTweetId('');
                            }}
                        >
                            <CloseIcon />
                        </div>
                    </div>
                </div>
                <TweetTextarea size="lg" placeholder={replyingTweetId && 'Tweet your reply'} />
            </div>
        </Backdrop>
    );
};

export default TweetCompose;
