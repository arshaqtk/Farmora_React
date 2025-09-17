import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Assets/css/Sendreply.css'; // External CSS for additional styling



export const Send_reply = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();

    const onSub = (data) => {
        try {
            data.id = id;

            axios({
                method: 'post',
                url: '/add_complaint_reply',
                data: data,
            })
            .then((response) => {
                const res = response.data;
                alert(res.message);
                if (res.status) {
                    window.location = '/Admin_View_complaint';
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
        <div className="send-reply-container">
            <div className="send-reply-card">
                <h1 className="send-reply-title">Send Reply</h1>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className="form-group">
                        <textarea
                            className={`form-control ${errors.reply ? 'is-invalid' : ''}`}
                            placeholder="Type your reply here..."
                            {...register("reply", { required: "Reply is required" })}
                        ></textarea>
                        {errors.reply && (
                            <div className="invalid-feedback">
                                {errors.reply.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="send-reply-button">
                        Send Reply
                    </button>
                </form>
            </div>
        </div>
    );
};