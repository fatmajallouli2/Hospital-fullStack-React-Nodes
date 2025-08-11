import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Job = () => {
  const [job, setJob] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/job')
        .then(result => {
            if(result.data.Status) {
                setJob(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Job List</h3>
      </div>
      <Link to="/dashboard/add_job" className="btn btn-success">
        Add Job
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {job.map((j) => (
              <tr key={j.id}>
                <td>{j.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Job;
