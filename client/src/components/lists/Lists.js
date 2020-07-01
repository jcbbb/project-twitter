import React, { useContext } from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';

import './lists.scss';

const Lists = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="lists">
            <Wall className="wall wall--320">
                <WallHeader arrow="true" subheading={currentUser.handle}>
                    Lists
                </WallHeader>
                <div className="lists__pinned">
                    <div className="lists__pinned-header">
                        <h2 className="lists__heading">Pinned</h2>
                    </div>
                    <ul className="lists__pinned-list">
                        <p>
                            Nothing to see here yet &mdash; pin up to five of your favorite lists to access them
                            quickly.
                        </p>
                    </ul>
                </div>
                <div className="divider"></div>
                <div className="lists__your">
                    <div className="lists__your-header">
                        <h2 className="lists__heading">Your Lists</h2>
                    </div>
                    <div className="lists__your-list">
                        <h2>You haven't created any Lists yet</h2>
                        <p>When you do, it'll show up here.</p>
                        <Button styleType="filled" fit size="md">
                            Create a List
                        </Button>
                    </div>
                </div>
            </Wall>
        </div>
    );
};

export default Lists;
