import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRouter.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    //contrôle les échanges entre un navigateur et un serveur quand ils n’ont pas la même origine
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); //// Middleware pour parser le JSON reçu dans le corps des requêtes
app.use(cookieParser());
app.use("/auth", adminRouter);
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("Server is running");
});
