import { getAllHouses } from "../controllers/houses_controllers";
import { Router } from "express";

const router = Router();

router.get("/houses", getAllHouses);

export default router;
