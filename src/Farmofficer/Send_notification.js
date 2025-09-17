import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Assets/css/Sendnotification.css'; // External CSS for advanced styling
import { NavBar } from './Nav';

export const Send_notification = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = (data) => {
        console.log(data);
        try {
            data.id = id;
            data.oid = sessionStorage.getItem('oid');

            axios({
                method: 'post',
                url: '/add_notification',
                data: data,
            })
            .then((response) => {
                const res = response.data;
                console.log(res.status);
                alert(res.message);
                if (res.status) {
                    window.location = '/Farm_officer_Home';
                }
                console.log(res);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    return (
       <div>
        <NavBar></NavBar>
         <div className="send-notification-container">
            <div className="send-notification-card">
                <h1 className="send-notification-title">SEND NOTIFICATION</h1>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className="form-group">
                        <label>Title</label>
                        <textarea
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder="Enter notification title..."
                            {...register("title", { required: "Title is required" })}
                        ></textarea>
                        {errors.title && (
                            <div className="invalid-feedback">
                                {errors.title.message}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            placeholder="Enter notification description..."
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && (
                            <div className="invalid-feedback">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="send-notification-button">
                        Send Notification
                    </button>
                </form>
            </div>
        </div>
       </div>
    );
};