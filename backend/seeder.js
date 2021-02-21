import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import memes from "./data/memes.js";
import Meme from "./models/memeModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Meme.deleteMany();

    const createdMeme = await Meme.insertMany(memes);

    console.log("Data imported successfully".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Meme.deleteMany();
    console.log("Data deleted successfully".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
