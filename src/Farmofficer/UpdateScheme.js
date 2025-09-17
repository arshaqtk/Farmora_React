import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Assets/css/UpdateScheme.css'; // Import the CSS file
import { Nav } from 'react-bootstrap';

export const Update_scheme = () => {
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
            url: '/view_one_scheme_info',
            data: { schemeid: id }
        })
            .then((response) => {
                const res = response.data;
                setValue('title', res.data.title);
                setValue('name', res.data.name);
                setValue('description', res.data.description);
                setValue('eligibilty', res.data.eligibilty);
                setValue('link', res.data.link);
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
            const response = await axios.post('/update_scheme', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const res = response.data;
            alert(res.message);
            if (res.status) {
                window.location = '/Farm_officer_View_scheme';
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
        
        <div className="body" style={{ backgroundColor: "#f8f8e8"}}>
        <div className="update-scheme-container">
            <div className="update-scheme-card">
            <h2>UPDATE SCHEME</h2>
            <form method="POST" onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
                <div className="form-group">
                    <label>Scheme Title</label>
                    <input type="text" placeholder="Title" name="title" {...register("title", { required: "Title is required" })} />
                    {errors.title && (<small className="error-message">{errors.title.message}</small>)}
                </div>
                <div className="form-group">
                    <label>Scheme Name</label>
                    <input type="text" placeholder="Name" name="name" {...register("name", { required: "Scheme name is required" })} />
                    {errors.name && (<small className="error-message">{errors.name.message}</small>)}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description" name="description" {...register("description", { required: "Description is required" })} />
                    {errors.description && (<small className="error-message">{errors.description.message}</small>)}
                </div>
                <div className="form-group">
                    <label>Farmer Eligibility</label>
                    <input type="text" placeholder="Eligibility" name="eligibilty" {...register("eligibilty", { required: "Eligibility is required" })} />
                    {errors.eligibilty && (<small className="error-message">{errors.eligibilty.message}</small>)}
                </div>
                <div className="form-group">
                        <label>Scheme Link</label>
                        <input
                            type="text"
                            placeholder="Enter Scheme Link"
                            {...register("link", { required: "link is required" })}
                        />
                        {errors.link && <small className="text-danger">{errors.link.message}</small>}
                    </div>
                <div className="form-group">
                    <label>Image</label>
                    <img src={currentimage} height={100} width={100} alt="Current Scheme" />
                    <input type="file" {...register("image")} />
                </div>
                <div className="form-group">
                    <input type="submit" className="submit-button" value="Update Scheme" />
                </div>
            </form>
            </div>
            
        </div>
        </div>
    );
};