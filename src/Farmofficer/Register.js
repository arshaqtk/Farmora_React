import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import farming from './Assets/img/bg4k7.jpg';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSub = (data) => {
    data.image = data.image[0];

    try {
      axios({
        method: 'post',
        url: '/officerregistration',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          const res = response.data;
          alert(res.message);


          if (res.message == "exist") {
            alert("username exist...please try again............")
          }
          else {
            if (res.status) {
              window.location = '/';
            }
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
    <div className="container my-3 gradient-form shadow-lg bg-light p-4" style={{ backgroundColor: "#f4f4f4" }}>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-5 d-flex align-items-center">
          <div
            className="w-100 h-100 d-flex flex-column justify-content-center text-white px-4 py-5"
            style={{
              backgroundImage: `url(${farming})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h4 className="mb-4 text-center">FARMORA</h4>
            <p className="large mb-0 text-center">
              FARMORA is an innovative web application designed to revolutionize the agricultural industry by leveraging modern technology.
            </p>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="col-md-7">
          <div className="p-4">
            <h4 className="text-center mb-4">Register</h4>
  
            {/* Form Starts Here */}
            <form onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
              <div className="row g-3">
                {/* Name and Gender Fields */}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <small className="text-danger">{errors.name.message}</small>}
                </div>
  
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <div className="d-flex align-items-center">
                    <label className="me-3">
                      <input type="radio" name="gender" value="male" {...register("gender", { required: "Gender is required" })} /> Male
                    </label>
                    <label>
                      <input type="radio" name="gender" value="female" {...register("gender", { required: "Gender is required" })} /> Female
                    </label>
                  </div>
                  {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
                </div>
  
                {/* Village Field */}
                <div className="col-12">
                  <label htmlFor="place" className="form-label">Village</label>
                  <select className="form-select" id="place" {...register("place", { required: "Village is required" })}>
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
                  {errors.place && <small className="text-danger">{errors.place.message}</small>}
                </div>
  
                {/* Position, Pin, and Post Fields */}
                <div className="col-md-6">
                  <label htmlFor="position" className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    placeholder="Enter your position"
                    {...register("position", { required: "Position is required" })}
                  />
                  {errors.position && <small className="text-danger">{errors.position.message}</small>}
                </div>
  
                <div className="col-md-6">
                  <label htmlFor="pin" className="form-label">Pin</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pin"
                    placeholder="Enter your pin code"
                    {...register("pin", { required: "Pin is required" })}
                  />
                  {errors.pin && <small className="text-danger">{errors.pin.message}</small>}
                </div>
  
                <div className="col-md-6">
                  <label htmlFor="post" className="form-label">Post</label>
                  <input
                    type="text"
                    className="form-control"
                    id="post"
                    placeholder="Enter your post"
                    {...register("post", { required: "Post is required" })}
                  />
                  {errors.post && <small className="text-danger">{errors.post.message}</small>}
                </div>
  
                {/* Mobile Number */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your mobile number"
                    {...register("phone", { required: "Mobile number is required" })}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                </div>
  
                {/* Image Upload */}
                <div className="col-12">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" className="form-control" id="image" {...register("image", { required: "Image is required" })} />
                  {errors.image && <small className="text-danger">{errors.image.message}</small>}
                </div>
  
                {/* Username and Password Fields */}
                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">E-mail</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your E-mail"
                    {...register("username", {
                      required: "Username is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address"
                      }
                    })}
                  />
                  {errors.username && <small className="text-danger">{errors.username.message}</small>}
                </div>
  
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <small className="text-danger">{errors.password.message}</small>}
                </div>
              </div>
  
              {/* Submit Button */}
              {/* Submit Button */}
              <div className="text-center pt-1 mb-5 pb-1">
                <button type="submit" className="btn btn-primary w-100 gradient-custom-2" style={{marginTop:20}}>
                  Register
                </button>
              </div>

              {/* Login Link */}
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Already have an account?</p>
                <a href="/" className="btn btn-outline-danger mx-2">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
};