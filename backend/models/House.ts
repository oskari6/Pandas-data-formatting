import { DataTypes, INTEGER, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import HousePhoto from "./HousePhoto";
import HouseAmenity from "./HouseAmenity";
import HouseFeature from "./HouseFeature";
import HouseAgent from "./HouseAgent";
import HouseLocation from "./HouseLocation";

class House extends Model {
  public status!: string;
  public price!: number;
  public bed!: bigint;
  public bath!: bigint;
  public acre_lot!: number;
  public house_size!: bigint;
  public prev_sold_date!: Date | null;
  public house_id!: bigint;
  public year_built?: bigint;
  public created_at!: Date;
  public address!: string;
  public location_id!: bigint;
  public agent_id?: bigint;
  public property_type?: string;
}

House.init(
  {
    house_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    property_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "houses",
    timestamps: false,
  }
);

House.hasMany(HousePhoto, { foreignKey: "house_id", as: "photos" });
HousePhoto.belongsTo(House, { foreignKey: "house_id", as: "house" });
House.belongsToMany(HouseAmenity, {
  through: "house_amenity_map",
  foreignKey: "house_id",
  as: "amenities",
  timestamps: false,
});
HouseAmenity.belongsToMany(House, {
  through: "house_amenity_map",
  foreignKey: "amenity_id",
  as: "houses",
  timestamps: false,
});
House.belongsToMany(HouseFeature, {
  through: "house_feature_map",
  foreignKey: "house_id",
  as: "features",
  timestamps: false,
});
HouseFeature.belongsToMany(House, {
  through: "house_feature_map",
  foreignKey: "feature_id",
  as: "houses",
  timestamps: false,
});

House.belongsTo(HouseAgent, { foreignKey: "agent_id", as: "agent" });
HouseAgent.hasMany(House, { foreignKey: "agent_id", as: "houses" });
House.belongsTo(HouseLocation, { foreignKey: "location_id", as: "location" });

export default House;
