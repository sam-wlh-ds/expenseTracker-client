import React, { useState } from "react";
import AuthNavbar from "../components/AuthNav";
import Error from "../components/Error"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  localStorage.clear()
  sessionStorage.clear()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    tnc: false,
  });

  const [error , setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tnc){
        setError("You must agree to the Terms and Conditions to complete registration")
        return
    }
    if (formData.password != formData.confirmPassword){
        setError("Confirm Password doesn't match")
        return
    }
    try {
      const payload = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(
        "http://localhost:1234/api/register",
        payload
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tnc: false,
      });
      setError(null);

      navigate("/login")
      
    } catch (err) {
      const main_err = err.response.data.message;
      setError(main_err? main_err:"Something Went Wrong");
    }
  };

  const isSmallWidth = window.innerWidth < 900;

  return (
    <>
      <AuthNavbar />

      <main
        className={
          isSmallWidth
            ? "main-close form-signin w-100 m-auto container"
            : "main-open form-signin w-100 m-auto container"
        }
      >
        <form className="form-style" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Create Your Account</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputName"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="floatingInputName">Username</label>
          </div>
          <span>&nbsp;</span>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInputEmail"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInputEmail">Email address</label>
          </div>
          <span>&nbsp;</span>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <span>&nbsp;</span>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingConPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="floatingConPassword">Confirm Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="tnc"
              value={formData.tnc}
              id="flexCheckDefault"
              checked={formData.tnc}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              I have read and agree with the&nbsp;
            </label>
            <Link to="/TNC" className="link">
              Terms and Conditions
            </Link>
          </div>
          <Error message={error}/>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Register
          </button>
        </form>
      </main>
    </>
  );
}

export default Register;
