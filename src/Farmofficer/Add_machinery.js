import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './Assets/css/AddMachinery.css'; // Custom CSS for animations, background, and responsiveness

export const Add_machinery = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSub = async (data) => {
        data.image = data.image[0];
        data.ofid = sessionStorage.getItem("oid");
        try {
            const response = await axios.post('/add_machinery', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const res = response.data;
            
            Swal.fire({
                icon: res.status ? 'success' : 'error',
                title: res.status ? 'Success!' : 'Oops...',
                text: res.message,
            }).then(() => {
                if (res.status) {
                    window.location = '/Farm_officer_View_machinery';
                }
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response ? error.response.data.message : 'Something went wrong!',
            });
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="background-image"></div> {/* Background image */}
            <div className="form-wrapper">
                <div className="glassmorphism">
                    <div className="card-header">
                        <h2 className="card-title">Add Machinery</h2>
                    </div>
                    <div className="card-body">
                        <form method="POST" onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="product_name"
                                    className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("name", { required: "Product name is required" })}
                                />
                                <label htmlFor="product_name" className="form-label">Product Name</label>
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="product_type"
                                    className={`form-input ${errors.category ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("category", { required: "Category is required" })}
                                />
                                <label htmlFor="product_type" className="form-label">Category</label>
                                {errors.category && (
                                    <div className="invalid-feedback">{errors.category.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="price"
                                    className={`form-input ${errors.price ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("price", { required: "Price is required" })}
                                />
                                <label htmlFor="price" className="form-label">Price</label>
                                {errors.price && (
                                    <div className="invalid-feedback">{errors.price.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="description"
                                    className={`form-input ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("description", { required: "Description is required" })}
                                />
                                <label htmlFor="description" className="form-label">Description</label>
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="quantity"
                                    className={`form-input ${errors.quantity ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("quantity", { required: "Quantity is required" })}
                                />
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                {errors.quantity && (
                                    <div className="invalid-feedback">{errors.quantity.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="file"
                                    id="formFile"
                                    className={`form-input ${errors.image ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    {...register("image", { required: "Image is required" })}
                                />
                                <label htmlFor="formFile" className="form-label">Product Image</label>
                                {errors.image && (
                                    <div className="invalid-feedback">{errors.image.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="submit-button">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
