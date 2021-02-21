import express from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";

import {
  db,
  getMemes,
  getMemeById,
  updateMeme,
  uploadMeme,
} from "../config/dbLocal.js";

const router = express.Router();

// @desc: Fetch top recent memes
// @route: GET /memes
// @access: Public

router.get("/", (req, res) => {
  let memes = getMemes();
  res.status(200);
  res.json(memes);
});

// @desc: Fetch a meme by its ID
// @route: GET /memes/:id
// @access: Public

router.get("/:id", (req, res) => {
  let meme = getMemeById(req.params.id);
  if (meme) {
    return res.sendStatus(200);
  } else {
    res.status(404);
    throw new Error("Meme not found!");
  }
});

// @desc: Upload a meme
// @route: POST /memes
// @access: Public

router.post(
  "/",
  asyncHandler(async (req, res) => {
    let { name, url, caption } = req.body;
    name = name.trim();
    url = url.trim();
    caption = caption.trim();
    if (name && url && caption) {
      let memeExists = db.get("memes").find({ url }).value();
      if (memeExists) {
        res.status(406);
        throw new Error("Meme already exists");
      }
      try {
        const { headers, status } = await axios.get(url);
        const contentType = headers["content-type"];
        console.log(contentType);
        if (
          status === 200 &&
          (contentType === "image/png" ||
            contentType === "image/jpeg" ||
            contentType === "image/gif" ||
            contentType === "image/svg+xml")
        ) {
          const meme = { name, url, caption };
          // console.log(meme);
          let data = uploadMeme(meme);
          res.status(201);
          res.json(data);
        } else {
          throw { customError: "Url doesn't point to an image." };
        }
      } catch (err) {
        if (err.hasOwnProperty("customError")) {
          res.status(415);
          throw new Error(err.customError);
        } else {
          res.status(400);
          throw new Error("Url field should contain valid url.");
        }
      }
    } else {
      res.status(400);
      throw new Error(
        "Please fill all enteries. Ensure that each entry is filled."
      );
    }
  })
);

// @desc: Update a meme
// @route: PATCH /memes/:id
// @access: Public

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    // const data = req.body;
    const id = req.params.id;
    let { url, caption } = req.body;
    let urlOK = false;
    let captionOK = false;
    if (url) {
      url = url.trim();
      if (url) {
        let memeExists = db.get("memes").find({ url }).value();
        if (memeExists && memeExists._id !== id) {
          res.status(406);
          throw new Error("Meme already exists");
        }
        try {
          const { headers, status } = await axios.get(url);
          const contentType = headers["content-type"];
          // console.log(contentType);
          if (
            status === 200 &&
            (contentType === "image/png" ||
              contentType === "image/jpeg" ||
              contentType === "image/gif" ||
              contentType === "image/svg+xml")
          ) {
            urlOK = true;
          } else {
            throw { customError: "Url doesn't point to an image." };
          }
        } catch (err) {
          if (err.hasOwnProperty("customError")) {
            res.status(415);
            throw new Error(err.customError);
          } else {
            res.status(400);
            throw new Error("Url field should contain a valid url.");
          }
        }
      } else {
        res.status(400);
        throw new Error("Url field can't be an empty string");
      }
    } else {
      urlOK = true;
    }
    if (caption) {
      caption = caption.trim();
      if (caption) {
        captionOK = true;
      } else {
        throw new Error("Caption field can't be an empty string");
      }
    } else {
      captionOK = true;
    }
    let meme = getMemeById(req.params.id);
    if (meme && captionOK && urlOK) {
      updateMeme(id, { url, caption });
      res.sendStatus(201);
    } else {
      res.status(404);
      throw new Error("Meme not found!");
    }
  })
);

export default router;
