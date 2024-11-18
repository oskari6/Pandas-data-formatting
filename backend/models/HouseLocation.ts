import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import House from "./House";

class HouseLocation extends Model {
  public lon?: number;
  public lat?: number;
  public unit?: string;
  public city?: string;
  public zip_code?: string;
  public location_id!: number;
}

HouseLocation.init(
  {
    location_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "house_locations",
    timestamps: false,
  }
);

export default HouseLocation;
