import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./authentication.css";
import logo from "../../logo.svg";

function Signup() {
  const [data, setData] = useState({
    uni: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    var { name, value } = event.target;
    name = event.target.id;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Password and cofirm password does not match");
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <div className="row">
        <div
          className="col-8 login-image-container"
          style={{ padding: 0 }}
        ></div>
        <div className="col-4 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <img className="logo" src={logo} />
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="uni">Uni:</label>
                <input
                  type="text"
                  className="form-control"
                  id="uni"
                  value={data.uni}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="row" style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
            <br />
            <br />
            <div className="row">Already a user ?</div>
            <div className="row">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
