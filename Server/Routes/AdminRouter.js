import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?"; // cherche dans la table admin une ligne où l'email et le mot de passe correspondent aux valeurs reçues
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    // La requête est lancée avec les paramètres reçus
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const token = jwt.sign(
        //creer un JSON Web Token signé avec une clé secrète
        { role: "admin", email: result[0].email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token); //Le token est envoyé au client sous forme de cookie HTTP
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});
router.get("/adminlogin", (req, res) => {
  res.send("Page GET adminlogin");
});
router.post("/add_job", (req, res) => {
  const sql = `INSERT INTO job (name) VALUES (?)`;
  con.query(sql, [req.body.job], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});
router.get("/job", (req, res) => {
  const sql = "SELECT * FROM job";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
// image upload
const storage = multer.diskStorage({
  //Indiquer où et comment stocker les fichiers
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
// end imag eupload

router.post("/add_personnel", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ Status: false, Error: "Aucun fichier reçu" });
  }
  const sql = `INSERT INTO personnel 
    (name,email,password, address, salary,image, job_id) 
    VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.job_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});
router.get("/personnel", (req, res) => {
  const sql = "SELECT * FROM personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM personnel WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
router.put("/edit_personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE personnel 
        set name = ?, email = ?, salary = ?, address = ?, job_id = ? 
        Where id = ?`;
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
router.delete("/delete_personnel/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from personnel where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/personnel_count", (req, res) => {
  const sql = "select count(id) as personnel from personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/job_count", (req, res) => {
  const sql = "select count (distinct job_id) as jobs from personnel";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "select * from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
