import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../webApi/Api";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    refCode: "",
  });

  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (formData.fName === "") {
      newErrors.fName = "First name is required";
    }
    if (formData.lName === "") {
      newErrors.lName = "Last name is required";
    }
    if (formData.email === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let response = await axios.post(Api.USER_SIGNUP, formData );
        if (response.data.status) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log("Form submitted successfully");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container-fluid" id="signup">
        <div className="row row1">
          <div className="col-md-12 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="fName"
                    value={formData.fName}
                    onChange={handleChange}
                  />
                  {errors.fName && <p>{errors.fName}</p>}
                </div>
                <div className="col-md-4">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lName"
                    value={formData.lName}
                    onChange={handleChange}
                  />
                  {errors.lName && <p>{errors.lName}</p>}
                </div>
              </div>
              <div className="row  justify-content-center">
                <div className="col-md-4">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="col-md-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p>{errors.password}</p>}
                </div>
              </div>
              <div className="row  justify-content-center">
                <div className="col-md-4">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <div className="col-md-4">
                  <label>Referral Code</label>
                  <input
                    type="text"
                    name="refCode"
                    value={formData.refCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-4">
                  <button className="w-100 mt-3" type="submit">
                    Sign Up
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-5 offset-4 mt-1">
                    <span>Already have on account?</span>
                    <span>
                      <Link to="/">SingIn</Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
