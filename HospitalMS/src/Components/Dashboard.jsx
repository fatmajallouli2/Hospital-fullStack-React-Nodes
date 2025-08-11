import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  // Fonction appelée lors du clic sur "Logout"
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        //si déconnexion réussie, redirection vers login
        navigate("/adminlogin");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar (menu de navigation vertical) */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Titre cliquable qui redirige vers le dashboard */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                HospitalMS
              </span>
            </Link>
            {/* Menu de navigation */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* Lien vers la page principale du dashboard */}
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {/* Lien vers la gestion du personnel */}
              <li className="w-100">
                <Link
                  to="/dashboard/personnel"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Personnel
                  </span>
                </Link>
              </li>
              {/* Lien vers la gestion des emplois */}
              <li className="w-100">
                <Link
                  to="/dashboard/job"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Jobs</span>
                </Link>
              </li>
              {/* Lien de déconnexion */}
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Contenu principal*/}
        <div className="col p-0 m-0">
          {/* Entête du dashboard */}
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Hospital Management System</h4>
          </div>
          {/* Composants enfants selon les sous-routes imbriquées */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
