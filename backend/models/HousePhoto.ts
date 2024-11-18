import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";

class HousePhoto extends Model {
  public photo_id!: number;
  public photo_url!: string;
  public description!: string;
  public house_id!: number;
}

HousePhoto.init(
  {
    photo_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    photo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    house_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "houses", // Name of the table you want to reference
        key: "house_id", // Primary key in the houses table
      },
    },
  },
  {
    sequelize,
    tableName: "house_photos",
    timestamps: false, // Disable timestamps if they are not in your table
  }
);

export default HousePhoto;
