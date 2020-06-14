import React, { useState, useCallback, useEffect } from 'react';
import Button from '../button/Button';
import Backdrop from '../backdrop/Backdrop';
import useHttp from '../../hooks/useHttp';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './messagesCompose.scss';

const MessagesCompose = () => {
    const { request } = useHttp();
    const history = useHistory();
    const [value, setValue] = useState(null);
    const [users, setUsers] = useState([]);
    const getUsers = useCallback(
        async (value) => {
            try {
                const response = await request(`/api/users/search/${value}`);
                if (response && response.status === 200 && response.status !== 500) {
                    setUsers(response.users);
                }
            } catch (e) {}
        },
        [request],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getUsers(value);
        return () => (isSubscribed = false);
    }, [value]);

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
                <ul className="messagesCompose__users">
                    {users.map((user, index) => (
                        <li key={index} className="messagesCompose__user">
                            <div className="messagesCompose__user-image"></div>
                            <div className="messagesCompose__user-info">
                                <span className="messagesCompose__user-name">{user.name}</span>
                                <span className="messagesCompose__user-handle">{user.handle}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Backdrop>
    );
};

export default MessagesCompose;
