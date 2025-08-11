import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPersonnel = () => {
  const [personnel, setPersonnel] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    job_id: "",
    image: "",
  });
  const [job, setJob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/job")
      .then((result) => {
        if (result.data.Status) {
          setJob(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", personnel.name);
    formData.append("email", personnel.email);
    formData.append("password", personnel.password);
    formData.append("address", personnel.address);
    formData.append("salary", personnel.salary);
    formData.append("image", personnel.image);
    formData.append("job_id", personnel.job_id);

    axios
      .post("http://localhost:3000/auth/add_personnel", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/personnel");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Personnel</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setPersonnel({ ...personnel, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setPersonnel({ ...personnel, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setPersonnel({ ...personnel, password: e.target.value })
              }
            />
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              laceholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setPersonnel({ ...personnel, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setPersonnel({ ...personnel, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="job" className="form-label">
              job
            </label>
            <select
              name="job"
              id="job"
              className="form-select­ "
              value={personnel.job_id}
              onChange={(e) =>
                setPersonnel({ ...personnel, job_id: e.target.value })
              }
            >
              {job.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setPersonnel({ ...personnel, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Personnel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonnel;
