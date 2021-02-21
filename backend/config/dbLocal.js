import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";
import shortid from "shortid";

const adapter = new FileSync("meme-database.json");
const db = low(adapter);

db.defaults({ memes: [] }).write();

function uploadMeme(meme) {
  meme._id = shortid.generate();
  db.get("memes").push(meme).write();
  return { _id: meme.id };
}

function getMemes() {
  let data = db.get("memes").value();
  let cloneData = [...data].reverse().slice(0, 100);
  return cloneData;
}

function getMemeById(_id) {
  return db.get("memes").find({ _id }).value();
}

function updateMeme(_id, data) {
  db.get("memes").find({ _id }).assign(data).write();
}

function deleteAllMeme() {
  db.get("memes").remove().write();
}

export { db, uploadMeme, getMemes, updateMeme, getMemeById, deleteAllMeme };
