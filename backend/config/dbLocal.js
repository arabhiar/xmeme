// this file is used to connect to local database(only if the website is running in development mode)
// that is stored in json file using lowdb module

import low from "lowdb"; // importing lowdb module
import FileSync from "lowdb/adapters/FileSync.js";
import shortid from "shortid"; // a utility module used to assign an unique short ID to an object

const adapter = new FileSync("meme-database.json"); // json file where data is stored
const db = low(adapter);

db.defaults({ memes: [] }).write(); // we are storing all the memes in a array called memes which is stored in json file

// @desc: function used to upload a new meme(pushing a new meme to memes array)

function uploadMeme(meme) {
  const id = shortid.generate();
  let { name, url, caption } = meme;
  const newMeme = { id, name, url, caption };
  db.get("memes").push(newMeme).write();
  return { id: newMeme.id };
}

// @desc: func used to get all the memes stored in memes array.

function getMemes() {
  let data = db.get("memes").value();
  let cloneData = [...data].reverse().slice(0, 100);
  // console.log(cloneData);
  return cloneData;
}

// @desc: func used to get a meme by it's ID

function getMemeById(id) {
  return db.get("memes").find({ id }).value();
}

// @desc: func used to update a meme

function updateMeme(id, data) {
  db.get("memes").find({ id }).assign(data).write();
}

// @desc: func used to delete all meme. It is only used to seed some sample data in json file

function deleteAllMeme() {
  db.get("memes").remove().write();
}

export { db, uploadMeme, getMemes, updateMeme, getMemeById, deleteAllMeme };
