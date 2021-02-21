// import axios from "axios";

// const validateImage = async (url) => {
//   try {
//     const { headers, status } = await axios.get(url);
//     const conTentType = headers["content-type"];
//     console.log(typeof conTentType);
//     if (
//       status === 200 &&
//       (conTentType === "image/png" ||
//         conTentType === "image/jpeg" ||
//         conTentType === "image/gif" ||
//         conTentType === "image/svg+xml")
//     ) {
//       console.log(true);
//     } else {
//       console.log(false);
//     }
//   } catch (err) {
//     console.log("Something went wrong");
//   }
// };

// validateImage("http://mandriver.users.sourceforge.net/classic-gnome-guide.html");

import mongoose from "mongoose";

const _id = mongoose.Types.ObjectId("aaaaaaaaaaaa");
console.log(_id);
console.log(_id.toString() === "616161616161616161616161");
