import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import './Assets/css/UpdatePlant.css';
import Swal from 'sweetalert2';

export const Update_plants = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const [currentImageUp, setImageUp] = useState('');
    const [resultUp, setResultUp] = useState([]);

    useEffect(() => {
        loadDataUp();
    }, []);

    function loadDataUp() {
        axios.post('/view_one_plants_info', { plantid: id })
            .then((response) => {
                const res = response.data;
                setValue('name', res.data.name);
                setValue('category', res.data.category);
                setValue('description', res.data.description);
                setValue('price', res.data.price);
                setValue('quantity', res.data.quantity);
                setImageUp(res.data.image);
                setResultUp(res.data || []);
                console.log(res);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    const onSubmitUp = async (data) => {
        data.image = data.image[0];
        data.id = id;
        try {
            const response = await axios.post('/update_plants', data, {
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
    
            if (error.response) {
                console.error('Error response:', error.response);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="form-containerUp">
            <div className="background-imageUp"></div>
            <div className="form-wrapperUp">
                <div className="glassmorphismUp">
                    <div className="card-headerUp">
                        <h2 className="card-titleUp">UPDATE PLANTS</h2>
                    </div>
                    <div className="card-bodyUp">
                        <form method="POST" onSubmit={handleSubmit(onSubmitUp)} encType="multipart/form-data">
                            <div className="form-groupUp">
                                <input
                                    type="text"
                                    id="product_nameUp"
                                    className={`form-inputUp ${errors.name ? 'is-invalidUp' : ''}`}
                                    placeholder=" "
                                    {...register("name", { required: "Product name is required" })}
                                />
                                <label htmlFor="product_nameUp" className="form-labelUp">Product Name</label>
                                {errors.name && <div className="invalid-feedbackUp">{errors.name.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <input
                                    type="text"
                                    id="product_typeUp"
                                    className={`form-inputUp ${errors.category ? 'is-invalidUp' : ''}`}
                                    placeholder=" "
                                    {...register("category", { required: "Category is required" })}
                                />
                                <label className="form-labelUp">Category</label>
                                {errors.category && <div className="invalid-feedbackUp">{errors.category.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <input
                                    type="number"
                                    id="priceUp"
                                    className={`form-inputUp ${errors.price ? 'is-invalidUp' : ''}`}
                                    placeholder=" "
                                    {...register("price", { required: "Price is required" })}
                                />
                                <label htmlFor="priceUp" className="form-labelUp">Price</label>
                                {errors.price && <div className="invalid-feedbackUp">{errors.price.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <input
                                    type="text"
                                    id="descriptionUp"
                                    className={`form-inputUp ${errors.description ? 'is-invalidUp' : ''}`}
                                    placeholder=" "
                                    {...register("description", { required: "Description is required" })}
                                />
                                <label htmlFor="descriptionUp" className="form-labelUp">Description</label>
                                {errors.description && <div className="invalid-feedbackUp">{errors.description.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <input
                                    type="text"
                                    id="quantityUp"
                                    className={`form-inputUp ${errors.quantity ? 'is-invalidUp' : ''}`}
                                    placeholder=" "
                                    {...register("quantity", { required: "Quantity is required" })}
                                />
                                <label htmlFor="quantityUp" className="form-labelUp">Quantity</label>
                                {errors.quantity && <div className="invalid-feedbackUp">{errors.quantity.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <label htmlFor="formFileUp" className="form-labelUp">Product Image</label>
                                <img src={currentImageUp} alt="Current Product" className="current-imageUp" />
                                <input
                                    type="file"
                                    id="formFileUp"
                                    className={`form-inputUp ${errors.image ? 'is-invalidUp' : ''}`}
                                    {...register("image")}
                                />
                                {errors.image && <div className="invalid-feedbackUp">{errors.image.message}</div>}
                            </div>
                            <div className="form-groupUp">
                                <button type="submit" className="submit-buttonUp">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
