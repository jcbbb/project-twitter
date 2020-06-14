import React, { useState, useCallback, useEffect, useRef } from 'react';
import Button from '../button/Button';
import Backdrop from '../backdrop/Backdrop';
import useHttp from '../../hooks/useHttp';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark.svg';
import './messagesCompose.scss';

const MessagesCompose = () => {
    const history = useHistory();
    const inputRef = useRef();
    const { request } = useHttp();
    const [value, setValue] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
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
    useEffect(() => {
        inputRef.current.focus();
    }, [selectedUsers]);

    return (
        <Backdrop>
            <div className="messagesCompose">
                <div className="messagesCompose__header">
                    <div className="messagesCompose__header--left">
                        <span className="messagesCompose__header-icon" onClick={() => history.goBack()}>
                            <CloseIcon />
                        </span>
                        <h2 className="messagesCompose__header-heading">New message</h2>
                    </div>
                    <div className="messagesCompose__header--right">
                        <Button className="button__filled" disabled={selectedUsers.length < 1}>
                            Next
                        </Button>
                    </div>
                </div>
                <div className="messagesCompose__scroller">
                    <div className="messagesCompose__searchbar-container">
                        <div className="messagesCompose__searchbar">
                            <input
                                className="messagesCompose__searchbar-input"
                                type="text"
                                placeholder="Search people"
                                value={value || ''}
                                onChange={({ target }) => setValue(target.value)}
                                ref={inputRef}
                            />
                            <span className="messagesCompose__searchbar-icon">
                                <SearchIcon />
                            </span>
                        </div>
                        {selectedUsers.length !== 0 && (
                            <ul className="messagesCompose__selected-users">
                                {selectedUsers.map((selectedUser, index) => (
                                    <li
                                        tabIndex="0"
                                        key={index}
                                        className="messagesCompose__selected-user"
                                        onClick={() => {
                                            setSelectedUsers(
                                                selectedUsers.filter((user) => user.name !== selectedUser.name),
                                            );
                                        }}
                                    >
                                        <div className="messagesCompose__selected-user-image"></div>
                                        <span className="messagesCompose__selected-user-name">{selectedUser.name}</span>
                                        <span className="messagesCompose__selected-user-icon">
                                            <CloseIcon />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className="messagesCompose__users">
                        {users.map((user, index) => {
                            let isSelected = selectedUsers.some((selected) => selected.name === user.name);
                            return (
                                <li
                                    tabIndex="0"
                                    key={index}
                                    className="messagesCompose__user"
                                    onClick={() => {
                                        if (!isSelected) {
                                            setValue('');
                                            return setSelectedUsers((prev) => [...prev, user]);
                                        }
                                        setSelectedUsers(
                                            selectedUsers.filter((selectedUser) => selectedUser.name !== user.name),
                                        );
                                    }}
                                >
                                    <div className="messagesCompose__user-image"></div>
                                    <div className="messagesCompose__user-info">
                                        <span className="messagesCompose__user-name">{user.name}</span>
                                        <span className="messagesCompose__user-handle">{user.handle}</span>
                                    </div>
                                    {isSelected && (
                                        <span className="messagesCompose__user-icon">
                                            <CheckmarkIcon />
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </Backdrop>
    );
};

export default MessagesCompose;
