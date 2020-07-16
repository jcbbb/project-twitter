import React, { useContext, useState, useCallback, useEffect } from 'react';
import Backdrop from '../backdrop/Backdrop';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import TweetsContext from '../../context/TweetsContext';
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
    const { currentUser, getCurrentUser } = useContext(UserContext);
    const { fetchTweets } = useContext(TweetsContext);
    const history = useHistory();

    const [counts, setCounts] = useState({
        name: 0,
        bio: 0,
        location: 0,
        website: 0,
    });

    const [images, setImages] = useState([]);

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
        [...target.files].map((file) => {
            setImages((prev) => ({
                ...prev,
                [target.name]: {
                    blob: URL.createObjectURL(file),
                    file,
                },
            }));
        });
    };

    const upload = useCallback(async () => {
        const formData = new FormData();
        for (let prop in images) {
            formData.append(images[prop].file.name, images[prop].file);
            formData.append('folder', prop);
        }

        try {
            await request(
                `/api/upload/profileMedia`,
                'POST',
                formData,
                {
                    undefined,
                    credentials: 'include',
                },
                true,
            );
        } catch (e) {}
    }, [request, images]);

    const save = useCallback(
        async (values) => {
            try {
                const response = await request('/api/users/user/profile/update', 'POST', {
                    ...values,
                });
                if (response && response.status === 200 && response.status !== 500) {
                    history.goBack();
                    getCurrentUser();
                }
            } catch (e) {}
        },
        [request, getCurrentUser, fetchTweets, history],
    );

    return (
        <Backdrop onClick={(ev) => ev.target === ev.currentTarget && history.goBack()}>
            <div className="profileSettings">
                {loading && (
                    <Backdrop>
                        <Loader />
                    </Backdrop>
                )}
                <div className="profileSettings__header">
                    <div className="profileSettings__header-left">
                        <div className="profileSettings__header-icon" tabIndex="0" onClick={() => history.goBack()}>
                            <span className="profileSettings__header-icon-inner" tabIndex="-1">
                                <CloseIcon />
                            </span>
                        </div>
                        <h2 className="profileSettings__header-heading">Edit profile</h2>
                    </div>
                    <Button
                        styleType="filled"
                        size="sm"
                        fit
                        onClick={() => {
                            myForm.submit();
                            upload();
                        }}
                    >
                        Save
                    </Button>
                </div>
                <div className="profileSettings__container">
                    <section
                        className="profile__banner profileSettings__banner"
                        style={{
                            backgroundImage: `url(${
                                images.banner ? images.banner.blob : currentUser.banner_image_url
                            })`,
                        }}
                    >
                        <input
                            className="profileSettings__file-input"
                            type="file"
                            accept="image/png, image/jpeg, image/svg, image/jpg, image/webp"
                            id="profileSettings__banner-input"
                            onChange={preview}
                            name="banner"
                        />
                        <label
                            htmlFor="profileSettings__banner-input"
                            className="profileSettings__picture-icon"
                            tabIndex="0"
                        >
                            <span className="profileSettings__picture-icon-inner" tabIndex="-1">
                                <CameraIcon />
                            </span>
                        </label>
                    </section>
                    <div className="profile__container">
                        <section className="profile__top-bar">
                            <div
                                className="profile__picture profileSettings__picture"
                                style={{
                                    backgroundImage: `url(${
                                        images.profile ? images.profile.blob : currentUser.profile_image_url
                                    })`,
                                }}
                            >
                                <input
                                    className="profileSettings__file-input"
                                    type="file"
                                    accept="image/png, image/jpeg, image/svg, image/jpg, image/webp"
                                    id="profileSettings__picture-input"
                                    name="profile"
                                    onChange={preview}
                                />
                                <label
                                    htmlFor="profileSettings__picture-input"
                                    className="profileSettings__picture-icon"
                                    tabIndex="0"
                                >
                                    <span className="profileSettings__picture-icon-inner" tabIndex="-1">
                                        <CameraIcon />
                                    </span>
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
