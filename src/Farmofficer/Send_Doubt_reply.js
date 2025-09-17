import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './Assets/css/SendDoubtReply.css'; // External CSS file

export const Send_doubt_reply = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = (data) => {
        console.log(data);
        try {
            data.id = id;
            data.oid = sessionStorage.getItem('oid');

            axios.post('/add_doubt_reply', data)
                .then((response) => {
                    const res = response.data;
                    alert(res.message);
                    if (res.status) {
                        window.location = '/Farm_officer_Home';
                    }
                    console.log(res);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response);
                    }
                });
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="reply-container">
            <div className="reply-card">
                <h1 className="reply-title">Send Doubt Reply</h1>
                <form onSubmit={handleSubmit(onSub)}>
                    <div className="reply-form-group">
                        <label className="reply-label"></label>
                        <textarea 
                            className={`reply-textarea ${errors.reply ? 'is-invalid' : ''}`}
                            placeholder="Enter your reply..."
                            {...register("reply", { required: "Reply is required" })}
                        ></textarea>
                        {errors.reply && <div className="reply-error">{errors.reply.message}</div>}
                    </div>
                    <button type="submit" className="reply-button">Send Reply</button>
                </form>
            </div>
        </div>
    );
};
