import React from 'react';
import Backdrop from '../backdrop/Backdrop';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './tweetCompose.scss';

const TweetCompose = () => {
    const history = useHistory();
    return (
        <Backdrop style={{ alignItems: 'flex-start' }}>
            <div className="tweetCompose">
                <div className="tweetCompose__header">
                    <div className="tweetCompose__header-icon">
                        <div className="tweetCompose__header-icon-inner" onClick={() => history.goBack()}>
                            <CloseIcon />
                        </div>
                    </div>
                </div>
                <TweetTextarea size="lg" />
            </div>
        </Backdrop>
    );
};

export default TweetCompose;
