import express from "express";

import {
  getMemes,
  getMemeById,
  uploadMeme,
  updateMeme,
} from "../controllers/memeController.js";

const router = express.Router();

router.route("/").get(getMemes);
router.route("/:id").get(getMemeById);
router.route("/").post(uploadMeme);
router.route("/:id").patch(updateMeme);

export default router;
