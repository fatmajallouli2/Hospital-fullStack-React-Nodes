import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddJob = () => {
  const [job, setJob] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi d'une requête POST vers le backend avec la donnée job
    axios.post("http://localhost:3000/auth/add_job", { job })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/job");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="job">
              <strong>Job:</strong>
            </label>
            {/* Champ texte pour saisir le nom du job, met à jour l'état 'job' au changement */}
            <input
              type="text"
              name="job"
              placeholder="Enter Job"
              onChange={(e) => setJob(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
