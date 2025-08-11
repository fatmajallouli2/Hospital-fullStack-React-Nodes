import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();
//definir route qui écoute les requetes http de type post sur le chemin /adminLogin
router.post("/adminlogin", (req, res) => {
  // sql cherche dans la table admin une ligne où l'email et le mot de passe correspondent aux valeurs reçues
  const sql = "SELECT * from admin Where email = ? and password = ?";
  // La requête est lancée avec les paramètres reçus de la req
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const token = jwt.sign(
        //creer un JSON Web Token signé avec une clé secrète
        { role: "admin", email: result[0].email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token); //jwt est envoyé au client sous forme de cookie HTTP sécurisé nommé "token" 
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get("/adminlogin", (req, res) => {
  res.send("Page GET adminlogin");
});

// Route POST pour ajouter un nouveau job dans la base de données
router.post("/add_job", (req, res) => {
  const sql = `INSERT INTO job (name) VALUES (?)`;
  con.query(sql, [req.body.job], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

// Route GET pour récupérer la liste de tous les jobs
router.get("/job", (req, res) => {
  const sql = "SELECT * FROM job";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour récupérer la liste de tout le personnel
router.get("/personnel", (req, res) => {
  const sql = "SELECT * FROM personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    // Si la requête réussit, renvoyer les résultats dans un objet JSON
    return res.json({ Status: true, Result: result });
  });
});

// Configuration des fichiers uploadés avec multer
const storage = multer.diskStorage({
  //Indiquer où et comment stocker les fichiers
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {// Nom composé du nom du champ + timestamp + extension originale du fichier
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Création d'un middleware multer avec la configuration définie ci-dessus
const upload = multer({
  storage: storage,
});

// Route POST pour ajouter un nouveau membre du personnel avec upload d'image
router.post("/add_personnel", upload.single("image"), (req, res) => {
  // Vérifie si un fichier image a bien été reçu
  if (!req.file) {
    return res.json({ Status: false, Error: "Aucun fichier reçu" });
  }
  const sql = `INSERT INTO personnel 
    (name,email,password, address, salary,image, job_id) 
    VALUES (?)`;
  // crypter le mot de passe reçu dans le corps de la requête
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    //les valeurs à insérer
    const values = [
      req.body.name,
      req.body.email,
      hash, //// mot de passe crypté
      req.body.address,
      req.body.salary,
      req.file.filename, // nom du fichier stocké
      req.body.job_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

// Route GET pour récupérer les données d'un personnel spécifique via son ID
router.get("/personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM personnel WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Route PUT pour modifier les informations d'un personnel existant identifié par son ID
router.put("/edit_personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE personnel 
        set name = ?, email = ?, salary = ?, address = ?, job_id = ? 
        Where id = ?`;
  // Tableau des nouvelles valeurs à insérer, provenant du corps de la requête HTTP 
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.job_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});
// Route DELETE pour supprimer un membre du personnel en fonction de son ID
router.delete("/delete_personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from personnel where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour compter le nombre total d'admins dans la table admin
router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour compter le nombre total de personnels dans la table personnel
router.get("/personnel_count", (req, res) => {
  const sql = "select count(id) as personnel from personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour compter le nombre total de jobs distincts dans la table personnel
router.get("/job_count", (req, res) => {
  const sql = "select count (distinct job_id) as jobs from personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour récupérer tous les admins
router.get("/admin_records", (req, res) => {
  const sql = "select * from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Route GET pour déconnecter l'utilisateur
router.get("/logout", (req, res) => {
  res.clearCookie("token"); //supprime le cookie nommé "token" qui contient le JWT
  return res.json({ Status: true });
});

export { router as adminRouter };
