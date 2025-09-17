import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavBar } from './Nav';



import './Assets/css/Sendnotification.css'; // External CSS for advanced styling

export const Add_public_notification = () => {
   
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = (data) => {
        console.log(data);
        try {
            data.oid = sessionStorage.getItem('oid');
    
            axios({
                method: 'post',
                url: '/add_public_notification',
                data: data,
            })
            .then((response) => {
                const res = response.data;
                console.log(res.status);
    
                Swal.fire({
                    title: res.status ? "Success!" : "Error!",
                    text: res.message,
                    icon: res.status ? "success" : "error",
                    confirmButtonText: "OK"
                }).then(() => {
                    if (res.status) {
                        window.location = '/Farm_officer_Home';
                    }
                });
    
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to send notification. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
    
                if (error.response) {
                    console.log(error.response);
                }
            });
        } catch (e) {
            Swal.fire({
                title: "Error!",
                text: e.message || "Something went wrong.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };
    

    return (
        <div>
            <NavBar></NavBar>
            <div className="send-notification-container">
            <div className="send-notification-card">
                <h1 className="send-notification-title">SEND NOTIFICATIONS</h1>
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