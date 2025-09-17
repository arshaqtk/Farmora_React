import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Assets/css/UpdateMachinery.css'; // Reuse the same CSS file or create a new one

export const Update_machinery = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const [currentimage, setImage] = useState('');

    useEffect(() => {
        loaddata();
    }, []);

    const loaddata = () => {
        axios.post('/view_one_machinery_info', { machineryid: id })
            .then((response) => {
                const res = response.data;
                if (res.status) {
                    setValue('name', res.data.name);
                    setValue('category', res.data.category);
                    setValue('description', res.data.description);
                    setValue('price', res.data.price);
                    setValue('quantity', res.data.quantity);
                    setImage(res.data.image);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch machinery details!',
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something went wrong while fetching data.',
                });
            });
    };

    const onSub = async (data) => {
        data.image = data.image[0];
        data.id = id;

        try {
            const response = await axios.post('/update_machinery', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const res = response.data;
            Swal.fire({
                icon: res.status ? 'success' : 'error',
                title: res.status ? 'Updated!' : 'Update Failed!',
                text: res.message,
            }).then(() => {
                if (res.status) {
                    window.location = '/Farm_officer_View_machinery';
                }
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Error',
                text: error.response ? error.response.data.message : 'Something went wrong!',
            });
        }
    };

    return (
        <div className="form-container">
            <div className="background-imageUM"></div> {/* Background image */}
            <div className="form-wrapper">
                <div className="glassmorphism">
                    <div className="card-header">
                        <h2 className="card-title">UPDATE MACHINERY</h2>
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
                                <label className="form-label">Category</label>
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
                                <label htmlFor="formFile" className="form-label">Product Image</label>
                                <img src={currentimage} alt="Current Product" className="current-image" />
                                <input
                                    type="file"
                                    id="formFile"
                                    className={`form-input ${errors.image ? 'is-invalid' : ''}`}
                                    {...register("image")}
                                />
                                {errors.image && (
                                    <div className="invalid-feedback">{errors.image.message}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="submit-button">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
