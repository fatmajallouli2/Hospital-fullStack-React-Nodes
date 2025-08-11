import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Personnel = () => {
  const [personnel, setPersonnel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/personnel")
      .then((result) => {
        if (result.data.Status) {
          setPersonnel(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_personnel/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Personnel List</h3>
      </div>
      <Link to="/dashboard/add_personnel" className="btn btn-success">
        Add Personnel
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Job</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + p.image}
                    className="personnel_image"
                  />
                </td>
                <td>{p.job_id}</td>
                <td>{p.email}</td>
                <td>{p.address}</td>
                <td>{p.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_personnel/` + p.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personnel;
