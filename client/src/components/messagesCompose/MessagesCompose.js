import React, { useState } from 'react';
import Button from '../button/Button';
import Backdrop from '../backdrop/Backdrop';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './messagesCompose.scss';

const MessagesCompose = () => {
    const history = useHistory();
    const [value, setValue] = useState(null);
    return (
        <Backdrop>
            <div className="messagesCompose">
                <div className="messagesCompose__header-container">
                    <div className="messagesCompose__header">
                        <div className="messagesCompose__header--left">
                            <span className="messagesCompose__header-icon" onClick={() => history.goBack()}>
                                <CloseIcon />
                            </span>
                            <h2 className="messagesCompose__header-heading">New message</h2>
                        </div>
                        <div className="messagesCompose__header--right">
                            <Button className="button__filled" disabled={true}>
                                Next
                            </Button>
                        </div>
                    </div>
                    <div className="messagesCompose__searchbar">
                        <input
                            className="messagesCompose__searchbar-input"
                            type="text"
                            placeholder="Search people"
                            value={value || ''}
                            onChange={({ target }) => setValue(target.value)}
                        />
                        <span className="messagesCompose__searchbar-icon">
                            <SearchIcon />
                        </span>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default MessagesCompose;
