import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './Assets/css/AddScheme.css'; // Import the CSS file for styling

export const Add_scheme = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = async (data) => {
        data.image = data.image[0];
        data.ofid = sessionStorage.getItem("oid");
        try {
            const response = await axios.post('/add_scheme', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const res = response.data;
            alert(res.message);
            if (res.status) {
                console.log("Success");
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
        <div className="add-scheme-container">
            <div className="add-scheme-card">
                <h2 className="add-scheme-title">ADD NEW SCHEME</h2>
                <form method="POST" onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Scheme Title</label>
                        <input
                            type="text"
                            placeholder="Enter scheme title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                    </div>
                    <div className="form-group">
                        <label>Scheme Name</label>
                        <input
                            type="text"
                            placeholder="Enter scheme name"
                            {...register("name", { required: "Scheme name is required" })}
                        />
                        {errors.name && <small className="text-danger">{errors.name.message}</small>}
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <small className="text-danger">{errors.description.message}</small>}
                    </div>
                    <div className="form-group">
                        <label>Farmer Eligibility</label>
                        <input
                            type="text"
                            placeholder="Enter eligibility criteria"
                            {...register("eligibilty", { required: "Eligibility is required" })}
                        />
                        {errors.eligibilty && <small className="text-danger">{errors.eligibilty.message}</small>}
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
                        <label>Product Image</label>
                        <input
                            type="file"
                            {...register("image", { required: "Image is required" })}
                        />
                        {errors.image && <small className="text-danger">{errors.image.message}</small>}
                    </div>
                    <div className="form-group">
                    <input type="submit" className="submit-button" value="Add Scheme" />
                </div>
                </form>
            </div>
        </div>
        </div>
    );
};