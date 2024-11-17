import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import House from "./House";

class HouseFeature extends Model {
  public feature_id!: number;
  public feature!: string;
  public value!: string;
  public description!: string;
}

HouseFeature.init(
  {
    feature_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    feature: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "house_features",
    timestamps: false, // Disable Sequelize's automatic timestamp columns if unnecessary
  }
);

HouseFeature.belongsToMany(House, { through: "HouseFeatureMap", as: "houses" });

export default HouseFeature;
