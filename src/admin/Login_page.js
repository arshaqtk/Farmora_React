import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';
import farm from './Assets/img/bg4k4.jpg';

export const Login_page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(""); // Added state for login error

  const onSub = async (data) => {
    try {
      const response = await axios.post('/login', data);
      const res = response.data;

      if (res.status) {
        if (res.type === "admin") {
          window.location = '/Admin_Manage_officer';
        } else if (res.type === "officer") {
          sessionStorage.setItem('oid', res.oid);
          sessionStorage.setItem('lid', res.lid);
          sessionStorage.setItem("off_place", res.place);
          window.location = '/Farm_officer_Home';
        } else {
          setLoginError("Invalid username or password"); // Show error message
        }
      } else {
        setLoginError("Invalid username or password"); // Show error if status is false
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
      console.error(error.response);
    }
  };

  return (
    <div className="container lcontainer my-5 gradient-form bg-light" style={{ backgroundColor: "#f4f4f4" }}>
      <div className="row">
        <div className="col-md-6 mb-5 mt-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-3 pb-1">WELCOME TO FARMORA</h4>
            </div>
            <p className="text-center mb-5">Please login to your account</p>
            <form onSubmit={handleSubmit(onSub)}>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your E-mail"
                  {...register("username", { required: "E-mail is required" })}
                />
                {errors.username && <small className="text-danger">{errors.username.message}</small>}
              </div>
              <div className="mb-4 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </div>
              <div className="text-center pt-1 mb-5 pb-1">
                <button type="submit" className="btn btn-primary w-100 gradient-custom-2">Sign in</button>
                {loginError && <p className="text-danger mt-2">{loginError}</p>} {/* Display login error */}
                <a className="text-muted d-block mt-2" href="forgot_password">Forgot password?</a>
              </div>
            </form>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <a href="/Farm_officer_Register" className="btn btn-outline-danger mx-2">Register</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-center h-100" style={{
            backgroundImage: `url(${farm})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          </div>
        </div>
      </div>
    </div>
  );
};
