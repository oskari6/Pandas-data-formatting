import { connectDatabase } from "./config/mysql_config";
import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import housesRoutes from "./routes/houses_routes";
import path from "path";

dotenvConfig();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDatabase();

app.use("/api", housesRoutes);
app.use(
  "/images",
  express.static(path.join(__dirname, "public", "real_estate_images_random"), {
    maxAge: "1d",
  })
);
app.listen(PORT, () => {
  console.log(`backend running at port ${PORT}`);
});
