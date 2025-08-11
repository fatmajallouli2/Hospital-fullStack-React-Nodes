import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [personnelTotal, setPersonnelTotal] = useState(0);
  const [jobTotal, setJobTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    adminCount();
    personnelCount();
    jobCount();
    AdminRecords();
  }, []);

  // Fonction pour récupérer la liste des admins via une requête GET
  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  // Fonction pour récupérer le nombre total d'admins
  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  // Fonction pour récupérer le nombre total de personnels
  const personnelCount = () => {
    axios.get("http://localhost:3000/auth/personnel_count").then((result) => {
      if (result.data.Status) {
        setPersonnelTotal(result.data.Result[0].personnel);
      }
    });
  };

  // Fonction pour récupérer le nombre total de jobs
  const jobCount = () => {
    axios.get("http://localhost:3000/auth/job_count").then((result) => {
      if (result.data.Status) {
        setJobTotal(result.data.Result[0].jobs);
      } else {
        alert(result.data.Error);
      }
    });
  };

  return (
    <div>
      {/* Section affichant les totaux Admin, Personnel et Jobs */}
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Personnel</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{personnelTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Personnel Jobs</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{jobTotal}</h5>
          </div>
        </div>
      </div>
      {/* Section affichant la liste des admins dans un tableau */}
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td>{a.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
