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
  name = name.trim(); // trimming to remove extra space
  url = url.trim(); // trimming to remove extra space
  caption = caption.trim(); // trimming to remove extra space
  if (name && url && caption) {
    // if meme, url & caption exists after trimming we will check if another meme with same url exists or not
    const memeExists = await Meme.findOne({ url });
    if (memeExists) {
      // if a meme exists with same error we will throw an error
      res.status(406);
      throw new Error("Meme already exists");
    }
    // in try catch block we are validating that if the url provided by user is valid or not
    // if it is valid, it points to an jpeg, png, svg or gif
    try {
      const { headers, status } = await axios.get(url); // we send a get request to provided url
      const contentType = headers["content-type"]; // content-type refers to the type of content send by the sever
      if (
        status === 200 &&
        (contentType === "image/png" ||
          contentType === "image/jpeg" ||
          contentType === "image/gif" ||
          contentType === "image/svg+xml")
      ) {
        // if content is png, jpeg, gif or svg+xml means we will post that meme to our database
        const meme = await Meme.create({
          name,
          url,
          caption,
        });
        if (meme) {
          res.status(201).json({ id: meme._id });
        } else {
          res.status(500);
          throw new Error("Something went wrong");
        }
      } else {
        // if content type is not an image or gif we will throw an error
        throw { customError: "Url doesn't point to an image." };
      }
    } catch (err) {
      // if there is some error in fetching the url means url doesn't exists hence we will throw an error
      if (err.hasOwnProperty("customError")) {
        res.status(415)
        throw new Error(err.customError);
      } else {
        res.status(400)
        throw new Error("Url field should contain valid url.");
      }
    }
  } else {
    // if after trimming, either of values become empty we will throw an error
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
  const id = req.params.id; // it is the parameter corresponding to requested meme for updation
  let { url, caption } = req.body;

  let urlOK = false; // it indicates if url paramater is valid for updation or not
  let captionOK = false; // it indicates if caption parameter is valid for updation or not
  if (url) {
    // if url parameter exists in the body then we must validate it
    url = url.trim(); // trimming the url
    if (url) {
      // if url exists after trimming we will check for if another meme with same url exists or not
      let memeExists = await Meme.findOne({ url });
      if (memeExists && memeExists._id.toString() !== id) {
        // if meme exists and the id of found meme is not equal to current id, we will throw an error
        res.status(406);
        throw new Error("Meme already exists");
      }
      // in try catch block we are validating that if the url provided by user is valid or not
      // if it is valid, it points to an jpeg, png, svg or gif
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
          // if content-type is image or png we will flag urlOK as true
          urlOK = true;
        } else {
          // else the url doesn't point to an image, hence we will throw an error
          throw { customError: "Url doesn't point to an image." };
        }
      } catch (err) {
        // if there is some error while sending request to uel, it means url doesn't exist
        if (err.hasOwnProperty("customError")) {
          res.status(415)
          throw new Error(err.customError);
        } else {
          res.status(400)
          throw new Error("Url field should contain a valid url.");
        }
      }
    } else {
      // if after trimming url is empty, we will throw an error
      res.status(400)
      throw new Error("Url field can't be an empty string");
    }
  } else {
    // since url parameter doesn't exist in the body, we are good to go for updation
    urlOK = true;
  }
  if (caption) {
    caption = caption.trim(); // trimming the caption
    if (caption) {
      // if after trimming caption exists it means we are good to go for updation and hence we will make captionOK as true
      captionOK = true;
    } else {
      // else we will throw an error since only spaces were provided as caption
      res.status(400)
      throw new Error("Caption field can't be an empty string");
    }
  } else {
    // since caption parameter doesn't exist in the body, we are good to go for updation
    captionOK = true;
  }
  const meme = await Meme.findById(req.params.id); // checking if the meme with given ID exists or not
  if (meme && captionOK && urlOK) {
    // if meme exists, captionOK is true and urlOK is true, it means everything is right and we will update the data
    meme.url = url;
    meme.caption = caption;
    await meme.save();
    res.sendStatus(201);
  } else {
    // if meme doesn't exist we will throw an error
    res.status(404);
    throw new Error("Meme not found!");
  }
});

export { getMemes, getMemeById, uploadMeme, updateMeme };
