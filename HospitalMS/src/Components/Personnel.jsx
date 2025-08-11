import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Personnel = () => {
  // pour stocker la liste du personnel récupérée depuis le backend
  const [personnel, setPersonnel] = useState([]);
  // Hook useEffect : s'exécute une seule fois au montage du composant
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/personnel") //Appel  GET pour récupérer la liste du personnel

      .then((result) => {
        if (result.data.Status) {
          setPersonnel(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // Fonction pour supprimer un personnel par son ID
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_personnel/" + id) // Appel API DELETE
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
        <h3>Personnel List</h3>
      </div>
      {/* Bouton pour aller vers le formulaire d'ajout */}
      <Link to="/dashboard/add_personnel" className="btn btn-success">
        Add Personnel
      </Link>
      {/* Tableau des données */}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Boucle sur le tableau 'personnel' pour afficher chaque ligne */}
            {personnel.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + p.image}
                    className="personnel_image"
                  />
                </td>
                <td>{p.email}</td>
                <td>{p.address}</td>
                <td>{p.salary}</td>
                <td>
                  {/* Bouton pour modifier un membre du personnel */}
                  <Link
                    to={`/dashboard/edit_personnel/` + p.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  {/* Bouton pour supprimer un membre du personnel*/}
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
