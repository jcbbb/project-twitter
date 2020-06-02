import React, { useContext, useState, useCallback } from 'react';
import Backdrop from '../backdrop/Backdrop';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import Input from '../input/Input';
import useHttp from '../../hooks/useHttp';
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';
import { Formiz, useForm } from '@formiz/core';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './profileSettings.scss';

const ProfileSettings = () => {
    const { user, getUser } = useContext(UserContext);
    const history = useHistory();
    const [counts, setCounts] = useState({
        name: 0,
        bio: 0,
        location: 0,
        website: 0,
    });
    const myForm = useForm();
    const { request, loading } = useHttp();

    const updateCounts = (ev) => {
        const { name, value } = ev.target;
        setCounts((prev) => ({
            ...prev,
            [name]: value.length,
        }));
    };

    const save = useCallback(
        async (values) => {
            try {
                const response = await request('/api/users/user/profile/update', 'POST', {
                    ...values,
                });
                if (response && response.status === 200 && response.status !== 500) {
                    history.goBack();
                    getUser();
                }
            } catch (e) {}
        },
        [request],
    );

    return (
        <Backdrop>
            <div className="profileSettings">
                {loading && <Loader />}
                <div className="profileSettings__header">
                    <div className="profileSettings__header-left">
                        <span
                            className="profileSettings__header-icon"
                            onClick={() => history.goBack()}
                        >
                            <CloseIcon />
                        </span>
                        <h2 className="profileSettings__header-heading">Edit profile</h2>
                    </div>
                    <Button
                        className="button__filled profileSettings__header-button"
                        onClick={myForm.submit}
                    >
                        Save
                    </Button>
                </div>
                <div className="profileSettings__container">
                    <section className="profile__banner">
                        <img />
                    </section>
                    <div className="profile__container">
                        <section className="profile__top-bar">
                            <div className="profile__picture">
                                <img src={user.profileImageUrl} />
                            </div>
                        </section>
                        <section className="profileSettings__inputs">
                            <Formiz connect={myForm} onValidSubmit={save}>
                                <form onSubmit={myForm.submit}>
                                    <Input
                                        name="name"
                                        placeholder="Add your name"
                                        label="Name"
                                        groupClassName="profileSettings__form-group"
                                        hasCounter="true"
                                        initial={counts.name}
                                        limit="50"
                                        maxlength="50"
                                        onInput={updateCounts}
                                        defaultValue={user.name}
                                    />
                                    <Input
                                        name="bio"
                                        placeholder="Add your bio"
                                        label="Bio"
                                        groupClassName="profileSettings__form-group"
                                        isTextarea="true"
                                        cols="80"
                                        hasCounter="true"
                                        initial={counts.bio}
                                        limit="160"
                                        maxlength="160"
                                        onInput={updateCounts}
                                        defaultValue={user.bio}
                                    />
                                    <Input
                                        name="location"
                                        placeholder="Add your location"
                                        label="Location"
                                        groupClassName="profileSettings__form-group"
                                        hasCounter="true"
                                        initial={counts.location}
                                        limit="30"
                                        maxlength="30"
                                        onInput={updateCounts}
                                        defaultValue={user.location}
                                    />
                                    <Input
                                        name="website"
                                        placeholder="Add your website"
                                        label="Website"
                                        groupClassName="profileSettings__form-group"
                                        hasCounter="true"
                                        initial={counts.website}
                                        limit="100"
                                        maxlength="100"
                                        onInput={updateCounts}
                                        defaultValue={user.website}
                                    />
                                </form>
                            </Formiz>
                        </section>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default ProfileSettings;
