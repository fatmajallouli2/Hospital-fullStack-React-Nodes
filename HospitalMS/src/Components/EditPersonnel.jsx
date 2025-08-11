import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditPersonnel = () => {
  const { id } = useParams()  // Récupérer l'id du personnel à éditer depuis l'URL
  const [personnel, setPersonnel] = useState({ // État local pour stocker les données du personnel à éditer
    name: "",
    email: "",
    salary: "",
    address: "",
    job_id: "",
  });
  const [job, setJob] = useState([]) // État local pour stocker la liste des jobs disponibles
  const navigate = useNavigate()
  // useEffect s'exécute au montage du composant
  useEffect(() => {
    axios.get('http://localhost:3000/auth/job') // Récupérer la liste des jobs depuis le backend
      .then(result => {
        if (result.data.Status) {
          setJob(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
    // Récupérer les données du personnel à modifier via son id
    axios.get('http://localhost:3000/auth/personnel/' + id)
      .then(result => {
        setPersonnel({ // Mettre à jour l'état 'personnel' avec les données reçues
          ...personnel,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          job_id: result.data.Result[0].job_id,
        })
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Envoi des nouvelles données au backend via une requête PUT
    axios.put('http://localhost:3000/auth/edit_personnel/' + id, personnel)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/personnel') // Redirection vers la liste du personnel en cas de succès
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Personnel</h3>
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
              value={personnel.name}
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
              value={personnel.email}
              onChange={(e) =>
                setPersonnel({ ...personnel, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={personnel.salary}
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
              value={personnel.address}
              onChange={(e) =>
                setPersonnel({ ...personnel, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="job" className="form-label">
              job
            </label>
            <select name="job" id="job" className="form-select"
              onChange={(e) => setPersonnel({ ...personnel, job_id: e.target.value })}>
              {job.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit personnel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPersonnel