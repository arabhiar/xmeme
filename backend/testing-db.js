import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import {
  getMemes,
  getMemeById,
  updateMeme,
  uploadMeme,
} from "./config/dbLocal.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from backend server!");
});

app.get("/memes", (req, res) => {
  res.json(getMemes());
});

app.get("/memes/:id", (req, res) => {
  res.json(getMemeById(req.params.id));
});

app.post("/memes", (req, res) => {
  req.body.created_at = Date.now();
  const meme = req.body;
  console.log(meme);
  uploadMeme(meme);
  console.log("Stored Successfuly");
  res.status(201);
  res.json({ id: req.body.id });
});

app.patch("/memes/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateMeme(id, data);
  res.status(201);
  res.json({ message: "success" });
});

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
