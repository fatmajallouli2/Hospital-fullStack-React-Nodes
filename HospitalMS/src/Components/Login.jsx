import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    //formulaire contrôlé
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // envoyer le cookie avec chaque requete
  const handleSubmit = (event) => {
    event.preventDefault(); // empeche la recharge de la page entiere
    axios
      .post("http://localhost:3000/auth/adminlogin", values) //envoyer une requête API
      .then((res) => {
        if (res.data.loginStatus) {
          navigate("/dashboard");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger"> {error && error}</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(event) =>
                setValues({ ...values, email: event.target.value })
              }
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(event) =>
                setValues({ ...values, password: event.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
