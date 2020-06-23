import React, { useState, useCallback, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import ProgressBar from '../progressBar/ProgressBar';
import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import './searchInput.scss';

const SearchInput = ({ ...props }) => {
    const { request, loading } = useHttp();
    const [value, setValue] = useState(null);
    const [foundUsers, setFoundUsers] = useState([]);

    const findUsers = useCallback(
        async (value) => {
            try {
                const response = await request(`/api/users/search/${value}`);

                if (response && response.status === 200 && response.status !== 500) {
                    setFoundUsers(response.users);
                }
            } catch (e) {}
        },
        [request],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (value && isSubscribed) findUsers(value);

        return () => (isSubscribed = false);
    }, [value, findUsers]);

    return (
        <div className="search-group" {...props}>
            <input
                type="text"
                className="search-group__input"
                placeholder="Search Twitter"
                onChange={({ target }) => setValue(target.value)}
                value={value || ''}
            />
            <span className="search-group__icon-search">
                <SearchIcon />
            </span>
            {value && (
                <span className="search-group__icon-close" onClick={() => setValue('')}>
                    <CloseIcon />
                </span>
            )}
            <div className="search-group__results">
                {loading && <ProgressBar />}
                <p className="search-group__instruction" style={{ textAlign: value ? 'left' : 'center' }}>
                    {value ? `Search for "${value}"` : 'Try to search for people, topics or keywords'}
                </p>
                {foundUsers && <div className="divider"></div>}
                <ul className="search-group__users relative">
                    {foundUsers.map((user, index) => (
                        <Link key={index} to={`/${user.handle}`}>
                            <li className="search-group__user">
                                <div
                                    className="search-group__user-image"
                                    style={{ backgroundImage: `url(${user.profile_image_url})` }}
                                ></div>
                                <div className="search-group__user-info">
                                    <div className="search-group__user-name-container">
                                        <span className="search-group__user-name">{user.name}</span>
                                    </div>
                                    <div className="search-group__user-handle-container">
                                        <span className="search-group__user-handle">{user.handle}</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;
