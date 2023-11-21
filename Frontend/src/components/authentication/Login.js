import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./authentication.css";
import logo from "../../logo.svg";

function Login() {
  const [uni, setUni] = useState("");
  const [password, setPassword] = useState("");

  const handleUniChange = (event) => {
    setUni(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("uni:", uni, "Password:", password);
    localStorage.setItem("uni", uni);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("name", "John Doe");
    window.location.href = "/";
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
                  value={uni}
                  onChange={handleUniChange}
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
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <br />
            <div className="row" style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <br />
            <br />
            <div className="row">New user ?</div>
            <div className="row">
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
