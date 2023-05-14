import mongoose from "mongoose";
import env from "./envValidation.js";

export default function () {
  mongoose
    .connect(env.MONGO_URI, {dbName: env.DB_NAME})
    .then(() => console.log(`Database Connected ✔`.yellow.bold));
}
