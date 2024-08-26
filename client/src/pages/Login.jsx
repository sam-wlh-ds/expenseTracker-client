import React, { useEffect, useState } from "react";
import AuthNavbar from "../components/AuthNav";
import Error from "../components/Error";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { getData } from "../helpers/helperFnx"

function Login() {
  const navigate = useNavigate();

  const { xAuthToken } = getData();

  // Redirect if token exists
  useEffect(() => {
    if (xAuthToken) {
      navigate("/dashboard");
    }
  }, [xAuthToken, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error , setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post("http://localhost:1234/api/login", payload);
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
      setError(null);

      const {id, username, token} = res.data;
      if(formData.rememberMe){ 
        localStorage.setItem("userID", id)
        localStorage.setItem("username",username)
        localStorage.setItem("x-auth-token",token)
      } else{
        sessionStorage.setItem("userID", id);
        sessionStorage.setItem("username",username)
        sessionStorage.setItem("x-auth-token",token)
     }
      navigate(`/dashboard`);
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
          {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
          <h1 className="h3 mb-3 fw-normal">Welcome Back</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <span>&nbsp;</span>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              name = "rememberMe"
              value={formData.rememberMe}
              id="flexCheckDefault"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <Error message={error}/>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Log in
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
