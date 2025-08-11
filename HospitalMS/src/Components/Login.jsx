import React, { useState } from "react";
import "./style.css";
import axios from "axios"; // Import librairie axios pour faire des requêtes HTTP
import { useNavigate } from "react-router-dom"; // Hook pour naviguer entre les pages

function Login() {
  const [values, setValues] = useState({
    //un état local pour stocker les valeurs du formulaire controlé

    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // envoyer les cookies avec chaque requete
  const handleSubmit = (event) => {
    event.preventDefault(); // empeche la recharge de la page entiere lors de la soumission
    axios
      .post("http://localhost:3000/auth/adminlogin", values) //envoyer une requête POST vers API backend avec données du formulaire
      .then((res) => {
        if (res.data.loginStatus) {
          navigate("/dashboard");
        } else {
          setError(res.data.Error); //Mauvais identifiants
        }
      })
      .catch((err) => console.log(err)); //probleme réseau ou serveur
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        {/* Afficher erreur si mauvais identifiants */}
        <div className="text-danger"> {error && error}</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            {/* Controlled input for email, updates state on change */}
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
