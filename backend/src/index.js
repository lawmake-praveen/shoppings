import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";
import db from "./config/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, "0.0.0.0", async () => {
  try {
    console.log(`listening port ${PORT}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});
