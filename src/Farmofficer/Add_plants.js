import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './Assets/css/AddPlant.css'; // Using the same styling as AddMachinery
import Swal from 'sweetalert2';


export const Add_plants = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = async (data) => {
        data.image = data.image[0];
        data.ofid = sessionStorage.getItem("oid");
        try {
            const response = await axios.post('/add_plants', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const res = response.data;
    
            Swal.fire({
                title: res.status ? "Success!" : "Error!",
                text: res.message,
                icon: res.status ? "success" : "error",
                confirmButtonText: "OK"
            }).then(() => {
                if (res.status) {
                    console.log("Success");
                    window.location = '/Farm_officer_View_plants';
                }
            });
    
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
    
            console.error('Error:', error.response || error);
        }
    };
    

    return (
        <div className="add-plant-container">
            <div className="add-plant-bg"></div> 
            <div className="add-plant-form-wrapper">
                <div className="add-plant-card">
                    <div className="add-plant-header">
                        <h2 className="add-plant-title">ADD PLANT</h2>
                    </div>
                    <div className="add-plant-body">
                        <form method="POST" onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
                            <div className="add-plant-group">
                                <input
                                    type="text"
                                    id="plant_name"
                                    className={`add-plant-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("name", { required: "Plant name is required" })}
                                />
                                <label htmlFor="plant_name" className="add-plant-label">Plant Name</label>
                                {errors.name && (<div className="add-plant-error">{errors.name.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <input
                                    type="text"
                                    id="category"
                                    className={`add-plant-input ${errors.category ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("category", { required: "Category is required" })}
                                />
                                <label htmlFor="category" className="add-plant-label">Category</label>
                                {errors.category && (<div className="add-plant-error">{errors.category.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <input
                                    type="number"
                                    id="price"
                                    className={`add-plant-input ${errors.price ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("price", { required: "Price is required" })}
                                />
                                <label htmlFor="price" className="add-plant-label">Price</label>
                                {errors.price && (<div className="add-plant-error">{errors.price.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <input
                                    type="text"
                                    id="description"
                                    className={`add-plant-input ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("description", { required: "Description is required" })}
                                />
                                <label htmlFor="description" className="add-plant-label">Description</label>
                                {errors.description && (<div className="add-plant-error">{errors.description.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <input
                                    type="text"
                                    id="quantity"
                                    className={`add-plant-input ${errors.quantity ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("quantity", { required: "Quantity is required" })}
                                />
                                <label htmlFor="quantity" className="add-plant-label">Quantity</label>
                                {errors.quantity && (<div className="add-plant-error">{errors.quantity.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <input
                                    type="file"
                                    id="formFile"
                                    className={`add-plant-input ${errors.image ? 'is-invalid' : ''}`}
                                    {...register("image", { required: "Image is required" })}
                                />
                                <label htmlFor="formFile" className="add-plant-label">Plant Image</label>
                                {errors.image && (<div className="add-plant-error">{errors.image.message}</div>)}
                            </div>
    
                            <div className="add-plant-group">
                                <button type="submit" className="add-plant-submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
};
