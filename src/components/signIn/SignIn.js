import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../webApi/Api";
function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(Api.USER_SIGNIN,{email,password});
      if (response.data.status) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container-fluid" id="signup">
        <div className="row row2">
          <h3>Login Form</h3>
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-4">
                  <button className="w-100 mt-3" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-5 offset-4 mt-1">
                    <span>Don't have on account?</span>
                    <span>
                      <Link to="/signup">SingUp</Link>
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

export default SignIn;
