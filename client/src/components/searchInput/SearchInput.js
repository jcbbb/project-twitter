import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './searchInput.scss';

const SearchInput = ({ ...props }) => {
    return (
        <div className="search-group" {...props}>
            <input type="text" className="search-group__input" placeholder="Search Twitter" />
            <span className="search-group__icon">
                <SearchIcon />
            </span>
            <div className="search-group__results">
                <p className="search-group__instruction">
                    Try to search for people, topics or keywords.
                </p>
            </div>
        </div>
    );
};

export default SearchInput;
