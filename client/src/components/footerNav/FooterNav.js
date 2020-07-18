import React from 'react';
import Navlink from '../navlink/Navlink';
import { withRouter } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as HomeIconFilled } from '../../assets/icons/home-filled.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as SearchIconFilled } from '../../assets/icons/search-icon-filled.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as NotificationIconFilled } from '../../assets/icons/notification-filled.svg';
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg';
import { ReactComponent as MessageIconFilled } from '../../assets/icons/message-filled.svg';

import './footerNav.scss';

const FooterNav = ({ location }) => {
    if (location.pathname.match(/messages\/.*/)) {
        return null;
    }
    return (
        <div className="footerNav">
            <Navlink to="/home" icon={<HomeIcon />} activeIcon={<HomeIconFilled />} style={{ marginBottom: '0' }} />
            <Navlink
                to="/explore"
                icon={<SearchIcon />}
                activeIcon={<SearchIconFilled />}
                style={{ marginBottom: '0' }}
            />
            <Navlink
                to="/notifications"
                icon={<NotificationIcon />}
                activeIcon={<NotificationIconFilled />}
                style={{ marginBottom: '0' }}
            />
            <Navlink
                to="/messages"
                icon={<MessageIcon />}
                activeIcon={<MessageIconFilled />}
                style={{ marginBottom: '0' }}
            />
        </div>
    );
};

export default withRouter(FooterNav);
