import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import House from "./House";

class HouseAmenity extends Model {
  public amenity_id!: number;
  public amenity!: string;
  public is_shared!: boolean;
  public description!: string;
  public extra_cost!: number;
}

HouseAmenity.init(
  {
    amenity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    amenity: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_shared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    extra_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "house_amenities",
    timestamps: false, // Disable Sequelize's automatic timestamp columns if unnecessary
  }
);

HouseAmenity.belongsToMany(House, { through: "HouseAmenityMap", as: "houses" });

export default HouseAmenity;
