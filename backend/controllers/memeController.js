import axios from "axios";
import asyncHandler from "express-async-handler";

import Meme from "../models/memeModel.js";

// @desc: Fetch top recent memes
// @route: GET /memes
// @access: Public

const getMemes = asyncHandler(async (req, res) => {
  const memes = await Meme.find().sort({ _id: -1 });
  res.status(200);
  res.json(memes);
});

// @desc: Fetch a meme by its ID
// @route: GET /memes/:id
// @access: Public

const getMemeById = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);
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

const uploadMeme = asyncHandler(async (req, res) => {
  let { name, url, caption } = req.body;
  name = name.trim();
  url = url.trim();
  caption = caption.trim();
  if (name && url && caption) {
    const memeExists = await Meme.findOne({ url });
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
        const meme = await Meme.create({
          name,
          url,
          caption,
        });
        if (meme) {
          res.status(201).json({ _id: meme._id });
        } else {
          res.status(500);
          throw new Error("Something went wrong");
        }
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
});

// @desc: Update a meme
// @route: PATCH /memes/:id
// @access: Public

const updateMeme = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);
  const id = req.params.id;
  let { url, caption } = req.body;

  let urlOK = false;
  let captionOK = false;
  if (url) {
    url = url.trim();
    if (url) {
      // console.log("URL entry exists");
      let memeExists = await Meme.findOne({ url });
      if (memeExists && memeExists._id.toString() !== id) {
        res.status(406);
        throw new Error("Meme already exists");
      }
      try {
        // console.log("url: ", url);
        // let data = await axios.get(url);
        // console.log("Data: ", data);
        const { headers, status } = await axios.get(url);
        // console.log("headers: ", headers);
        // console.log("status: ", status);
        const contentType = headers["content-type"];
        console.log(contentType);
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
          res.status(415)
          throw new Error(err.customError);
        } else {
          res.status(400)
          throw new Error("Url field should contain a valid url.");
        }
      }
    } else {
      res.status(400)
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
      res.status(400)
      throw new Error("Caption field can't be an empty string");
    }
  } else {
    captionOK = true;
  }
  const meme = await Meme.findById(req.params.id);
  if (meme && captionOK && urlOK) {
    // console.log(meme);
    meme.url = url;
    meme.caption = caption;
    // console.log(meme);
    await meme.save();
    res.sendStatus(201);
  } else {
    res.status(404);
    throw new Error("Meme not found!");
  }
});

export { getMemes, getMemeById, uploadMeme, updateMeme };
