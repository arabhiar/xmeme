import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import memeRoutes from "./routes//memeRoutes.js";
import memeRoutesLocal from "./routes/memeRoutesLocal.js";

const port = process.env.PORT || 8081;

dotenv.config();

const app = express();
app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use("/memes", memeRoutesLocal);
} else {
  connectDB();
  app.use("/memes", memeRoutes);
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is listening at port ${port} in ${process.env.NODE_ENV} mode.`
      .yellow.bold
  );
});
