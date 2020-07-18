import React from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Tab from '../tab/Tab';
import Button from '../button/Button';
import { ReactComponent as FeatherIcon } from '../../assets/icons/feather.svg';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';

const Notifications = () => {
    const match = useRouteMatch();
    const location = useLocation();
    return (
        <Wall>
            <WallHeader noBorder>Notifications</WallHeader>
            <div className="profile__tabs">
                <Tab exact to={match.url}>
                    All
                </Tab>
                <Tab exact to={`${match.url}/mentions`}>
                    Mentions
                </Tab>
            </div>
            <div className="tweet-fixed-button">
                <Link
                    to={{
                        pathname: '/compose/tweet',
                        state: { background: location },
                    }}
                >
                    <Button
                        size="lg"
                        styleType="filled button__round button__round--lg"
                        icon={<FeatherIcon />}
                    ></Button>
                </Link>
            </div>
        </Wall>
    );
};

export default Notifications;
