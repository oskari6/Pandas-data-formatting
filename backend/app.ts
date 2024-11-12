import { connectDatabase } from "./config/mysql_config";
import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDatabase();

app.listen(PORT, () => {
  console.log(`backend running at port ${PORT}`);
});
