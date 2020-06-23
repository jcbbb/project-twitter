import React from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Tab from '../tab/Tab';
import { useRouteMatch } from 'react-router-dom';

const Notifications = () => {
    const match = useRouteMatch();
    return (
        <Wall className="wall wall--320">
            <WallHeader>Notifications</WallHeader>
            <div className="profile__tabs">
                <Tab exact to={match.url}>
                    All
                </Tab>
                <Tab exact to={`${match.url}/mentions`}>
                    Mentions
                </Tab>
            </div>
        </Wall>
    );
};

export default Notifications;
