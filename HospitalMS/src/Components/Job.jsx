import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Job = () => {
  const [job, setJob] = useState([]);
  // récupérer la liste des jobs à partir du backend
  useEffect(() => {
    axios.get('http://localhost:3000/auth/job')
      .then(result => {
        if (result.data.Status) {
          setJob(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_job/" + id) // Appel API DELETE
      .then((result) => {
        if (result.data.Status) {
          window.location.reload(); // Si suppression réussie alors recharge de la page
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Job List</h3>
      </div>
      {/* Bouton Lien vers la page d'ajout d'un nouveau job */}
      <Link to="/dashboard/add_job" className="btn btn-success">
        Add Job
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Parcours la liste des jobs pour afficher chaque job dans une ligne du tableau */}
            {job.map((j) => (
              <tr key={j.id}>
                <td>{j.name}</td>
                <td><button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleDelete(j.id)}
                >
                  Delete
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Job;
