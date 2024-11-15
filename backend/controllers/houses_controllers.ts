import { Request, Response } from "express";
import House from "../models/House";
import HousePhoto from "../models/HousePhoto";

export const getAllHouses = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 42;
    const page = parseInt(req.query.page as string, 10) || 1;
    const offset = (page - 1) * limit;

    const houses = await House.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: HousePhoto,
          as: "photos",
          attributes: ["photo_url"],
        },
      ],
    });

    if (houses) {
      const housesWithPhotos = houses.rows.map((house) => {
        const houseJson = house.toJSON();
        houseJson.photos = houseJson.photos.map((photo: HousePhoto) => ({
          ...photo,
          photo_url: `http://localhost:8000/images${photo.photo_url.replace(
            /\\/g,
            "/"
          )}`,
        }));
        return houseJson;
      });

      res.status(200).json({
        message: "Houses fetched.",
        data: housesWithPhotos,
        total: houses.count,
        page,
        totalPages: Math.ceil(houses.count / limit),
      });
    } else {
      res.status(404).json({ message: "No houses found." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching houses: ${error}` });
  }
};
