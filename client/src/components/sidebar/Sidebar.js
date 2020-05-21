import React from 'react';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import TeslaLogo from '../../assets/images/tesla-logo.jpg';
import HuaweiLogo from '../../assets/images/huawei-logo.png';
import SamsungLogo from '../../assets/images/samsung-logo.png';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => (
    <aside className="sidebar">
        <SearchInput className="search-group search-group--lg" />
        <div className="sidebar__trends">
            <div className="sidebar__header sidebar__header--radius">
                <h2 className="sidebar__heading">Trends for you</h2>
            </div>
        </div>
        <div className="sidebar__who-to-follow">
            <div className="sidebar__header">
                <h2 className="sidebar__heading">Who to follow</h2>
            </div>
            <ul className="sidebar__list">
                <li className="sidebar__list-item" tabindex="0">
                    <div className="sidebar__list-item-image-container">
                        <img src={TeslaLogo} alt="Tesla logo" tabindex="0" />
                    </div>
                    <div className="sidebar__list-item-info">
                        <p className="sidebar__list-item-name" tabindex="0">
                            Tesla
                        </p>
                        <span className="sidebar__list-item-handle">@Tesla</span>
                    </div>
                    <Button className="sidebar__list-item-action">Follow</Button>
                </li>
                <li className="sidebar__list-item" tabindex="0">
                    <div className="sidebar__list-item-image-container">
                        <img src={HuaweiLogo} alt="Huawei logo" tabindex="0" />
                    </div>
                    <div className="sidebar__list-item-info">
                        <p className="sidebar__list-item-name" tabindex="0">
                            Huawei
                        </p>
                        <span className="sidebar__list-item-handle">@Huawei</span>
                    </div>
                    <Button className="sidebar__list-item-action">Follow</Button>
                </li>
                <li className="sidebar__list-item" tabindex="0">
                    <div className="sidebar__list-item-image-container">
                        <img src={SamsungLogo} alt="Huawei logo" tabindex="0" />
                    </div>
                    <div className="sidebar__list-item-info">
                        <p className="sidebar__list-item-name" tabindex="0">
                            Samsung
                        </p>
                        <span className="sidebar__list-item-handle">@Samsung</span>
                    </div>
                    <Button className="sidebar__list-item-action">Follow</Button>
                </li>
            </ul>
            <div className="sidebar__footer">
                <Link to="" className="sidebar__footer-link">
                    Show more
                </Link>
            </div>
        </div>
    </aside>
);

export default Sidebar;
