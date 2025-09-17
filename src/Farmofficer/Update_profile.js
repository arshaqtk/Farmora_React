import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 import './Assets/css/UpdateProfile.css'; // Import the new CSS file

export const Update_profile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const [currentimage, setImage] = useState([]);
    const [result, getresult] = useState([]);

    useEffect(() => {
        loaddata();
    }, []);

    function loaddata() {
        axios({
            method: 'post',
            url: '/officer_view_one_profile_info',
            data: { id: id }
        })
        .then((response) => {
            console.log("API Response:", response.data); // Check data structure
        
            const res = response.data;
            if (!res.data || !res.data.LOGIN_id) {
                console.warn("LOGIN_id is missing or not populated:", res.data);
            }
        
            setValue('name', res.data.name);
            setValue('position', res.data.position);
            setValue('phone', res.data.phone);
            setValue('gender', res.data.gender);
            setValue('place', res.data.place);
            setValue('post', res.data.post);
            setValue('pin', res.data.pin);
        
            setValue('username', res.data.LOGIN_id?.username || "");
            setValue('password', res.data.LOGIN_id?.password || "");
        
            setImage(res.data.image);
            getresult(res.data || []);
        })
        
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    const onSub = async (data) => {
        data.image = data.image[0];
        data.id = id;
        try {
            const response = await axios.post('/officer_update_profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const res = response.data;
            alert(res.message);
            if (res.status) {
                window.location = '/Farm_officer_Home';
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="profile-body" style={{ backgroundColor: '#f8f8e8' }}>
            <div className="update-profile-container">
                <div className="update-profile-card">
                    <h2>UPDATE PROFILE</h2>
                    <form method="POST" onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
                        <div className="profile-form-group">
                            <label>Officer Name</label>
                            <input type="text" placeholder="Name" {...register("name", { required: "Name is required" })} />
                            {errors.name && (<small className="profile-error-message">{errors.name.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Officer Position</label>
                            <input type="text" placeholder="Position" {...register("position", { required: "Position is required" })} />
                            {errors.position && (<small className="profile-error-message">{errors.position.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Phone</label>
                            <input type="text" placeholder="Phone" {...register("phone", { required: "Phone is required" })} />
                            {errors.phone && (<small className="profile-error-message">{errors.phone.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Gender</label>
                            <div>
                                <label>
                                    <input type="radio" value="male" {...register("gender", { required: "Gender is required" })} /> Male
                                </label>
                                <label>
                                    <input type="radio" value="female" {...register("gender", { required: "Gender is required" })} /> Female
                                </label>
                            </div>
                            {errors.gender && (<small className="profile-error-message">{errors.gender.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Village</label>
                            <select {...register("place", { required: "Village is required" })}>
                                <option value="">Select your village</option>
                                <option value="Kottakkal">Kottakkal</option>
                                <option value="Kuttippuram">Kuttippuram</option>
                                <option value="Valanjery">Valanjery</option>
                                <option value="Edayur">Edayur</option>
                                <option value="Thennala">Thennala</option>
                                <option value="Parappur">Parappur</option>
                                <option value="Tirur">Tirur</option>
                                <option value="Edarikode">Edarikode</option>
                                <option value="Othukkungal">Othukkungal</option>
                                <option value="Oorakam">Oorakam</option>
                            </select>
                            {errors.place && (<small className="profile-error-message">{errors.place.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Post</label>
                            <input type="text" placeholder="Post" {...register("post", { required: "Post is required" })} />
                            {errors.post && (<small className="profile-error-message">{errors.post.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Pin</label>
                            <input type="text" placeholder="Pin" {...register("pin", { required: "Pin is required" })} />
                            {errors.pin && (<small className="profile-error-message">{errors.pin.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Username</label>
                            <input type="text" placeholder="username" {...register("username", { required: "username is required" })} />
                            {errors.username && (<small className="profile-error-message">{errors.username.message}</small>)}
                        </div>
                         <div className="profile-form-group">
                            <label>Password</label>
                            <input type="text" placeholder="password" {...register("password", { required: "password is required" })} />
                            {errors.password && (<small className="profile-error-message">{errors.password.message}</small>)}
                        </div>
                        <div className="profile-form-group">
                            <label>Image</label>
                            <img src={currentimage} height={100} width={100} alt="Current Profile" />
                            <input type="file" {...register("image")} />
                        </div>
                        <div className="profile-form-group">
                            <input type="submit" className="profile-submit-button" value="Update Profile" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};