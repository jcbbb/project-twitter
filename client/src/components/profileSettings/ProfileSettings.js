import React, { useContext, useState, useCallback, useEffect } from 'react';
import Backdrop from '../backdrop/Backdrop';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import Input from '../input/Input';
import useHttp from '../../hooks/useHttp';
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';
import { Formiz, useForm } from '@formiz/core';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as CameraIcon } from '../../assets/icons/camera.svg';

import './profileSettings.scss';

const ProfileSettings = () => {
    const { request, loading } = useHttp();
    const { currentUser, getCurrentUser, fetchTweets } = useContext(UserContext);
    const history = useHistory();
    const [counts, setCounts] = useState({
        name: 0,
        bio: 0,
        location: 0,
        website: 0,
    });

    const [images, setImages] = useState({
        banner: null,
        profile: null,
    });

    const myForm = useForm();

    useEffect(() => {
        for (let val in myForm.values) {
            setCounts((prev) => ({
                ...prev,
                [val]: myForm.values[val] ? myForm.values[val].length : 0,
            }));
        }
    }, [myForm.values, setCounts]);

    const updateCounts = (ev) => {
        const { name, value } = ev.target;
        setCounts((prev) => ({
            ...prev,
            [name]: value.length,
        }));
    };

    const preview = ({ target }) => {
        setImages((prev) => ({
            ...prev,
            [target.name]: URL.createObjectURL(target.files[0]),
        }));
    };

    const upload = async ({ target }) => {
        const formData = new FormData();
        formData.append(target.name, target.files[0]);
        formData.append('folder', target.name);

        try {
            await request(
                `/api/upload/${target.name}`,
                'POST',
                formData,
                {
                    undefined,
                    credentials: 'include',
                },
                true,
            );
        } catch (e) {}
    };

    const save = useCallback(
        async (values) => {
            try {
                const response = await request('/api/users/user/profile/update', 'POST', {
                    ...values,
                });
                if (response && response.status === 200 && response.status !== 500) {
                    history.goBack();
                    getCurrentUser();
                    fetchTweets();
                }
            } catch (e) {}
        },
        [request, getCurrentUser, fetchTweets, history],
    );

    return (
        <Backdrop>
            <div className="profileSettings">
                {loading && (
                    <Backdrop>
                        <Loader />
                    </Backdrop>
                )}
                <div className="profileSettings__header">
                    <div className="profileSettings__header-left">
                        <span className="profileSettings__header-icon" onClick={() => history.goBack()}>
                            <CloseIcon />
                        </span>
                        <h2 className="profileSettings__header-heading">Edit profile</h2>
                    </div>
                    <Button className="button__filled profileSettings__header-button" onClick={myForm.submit}>
                        Save
                    </Button>
                </div>
                <div className="profileSettings__container">
                    <section
                        className="profile__banner profileSettings__banner"
                        style={{
                            backgroundImage: `url(${images.banner ? images.banner : currentUser.bannerImageUrl})`,
                        }}
                    >
                        <input
                            className="profileSettings__file-input"
                            type="file"
                            accept="image/png, image/jpeg, image/svg, image/jpg, image/webp"
                            id="profileSettings__banner-input"
                            onChange={(e) => {
                                preview(e);
                                upload(e);
                            }}
                            name="banner"
                        />
                        <label htmlFor="profileSettings__banner-input" className="profileSettings__picture-icon">
                            <CameraIcon />
                        </label>
                    </section>
                    <div className="profile__container">
                        <section className="profile__top-bar">
                            <div
                                className="profile__picture profileSettings__picture"
                                style={{
                                    backgroundImage: `url(${
                                        images.profile ? images.profile : currentUser.profileImageUrl
                                    })`,
                                }}
                            >
                                <input
                                    className="profileSettings__file-input"
                                    type="file"
                                    accept="image/png, image/jpeg, image/svg, image/jpg, image/webp"
                                    id="profileSettings__picture-input"
                                    name="profile"
                                    onChange={(e) => {
                                        preview(e);
                                        upload(e);
                                    }}
                                />
                                <label
                                    htmlFor="profileSettings__picture-input"
                                    className="profileSettings__picture-icon"
                                >
                                    <CameraIcon />
                                </label>
                            </div>
                        </section>
                        <section className="profileSettings__inputs" style={{ height: '100%' }}>
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
                                        defaultValue={currentUser.name}
                                    />
                                    <Input
                                        name="bio"
                                        placeholder="Add your bio"
                                        label="Bio"
                                        groupClassName="profileSettings__form-group"
                                        isTextarea="true"
                                        rows="3"
                                        hasCounter="true"
                                        initial={counts.bio}
                                        limit="160"
                                        maxlength="160"
                                        onInput={updateCounts}
                                        defaultValue={currentUser.bio}
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
                                        defaultValue={currentUser.location}
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
                                        defaultValue={currentUser.website}
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
