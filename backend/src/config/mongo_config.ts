import mongoose from "mongoose"; //mongodb
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const CONNECTION = process.env.CONNECTION || "";

//MongoDb conn
const connectDatabase = async () => {
  try {
    await mongoose.connect(CONNECTION);
    console.log("Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

export { connectDatabase };
