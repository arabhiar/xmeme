import mongoose from "mongoose";

const memeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  }
  //   {
  //     timestamps: true,
  //   }
);

const Meme = mongoose.model("Meme", memeSchema);
export default Meme;
