import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import HousePhoto from "./HousePhoto";
import HouseAmenity from "./HouseAmenity";
import HouseFeature from "./HouseFeature";
import HouseAgent from "./HouseAgent";

class House extends Model {
  public status!: string;
  public price!: number;
  public bed!: bigint;
  public bath!: bigint;
  public acre_lot!: number;
  public house_size!: bigint;
  public prev_sold_date!: Date | null;
  public house_id!: bigint;
  public year_built!: bigint;
  public created_at!: Date;
  public address!: string;
  public location_id!: bigint;
}

House.init(
  {
    house_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bed: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bath: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    acre_lot: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    house_size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    prev_sold_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    year_built: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "houses",
    timestamps: false, // Disable Sequelize's automatic timestamp columns if unnecessary
  }
);

House.hasMany(HousePhoto, { foreignKey: "house_id", as: "photos" });
HousePhoto.belongsTo(House, { foreignKey: "house_id", as: "house" });
House.belongsToMany(HouseAmenity, {
  through: "HouseAmenityMap",
  as: "amenities",
});
House.belongsToMany(HouseFeature, {
  through: "HouseFeatureyMap",
  as: "features",
});
House.belongsTo(HouseAgent, { as: "agent", foreignKey: "agent_id" });

export default House;
