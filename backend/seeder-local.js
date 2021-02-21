import colors from "colors";
import shortid from 'shortid'

import memes from "./data/memes.js";
import { uploadMeme, deleteAllMeme } from "./config/dbLocal.js";

const importData = () => {
  try {
    deleteAllMeme();
    memes.map((meme) => {
      uploadMeme(meme);
    });
    console.log("Data imported successfully".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = () => {
  try {
    deleteAllMeme();
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
