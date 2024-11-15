import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import HousePhoto from "./HousePhoto";

class House extends Model {
  public brokered_by!: string;
  public status!: string;
  public price!: number;
  public bed!: bigint;
  public bath!: bigint;
  public acre_lot!: number;
  public house_size!: bigint;
  public prev_sold_date!: Date | null;
  public house_id!: bigint;
  public year_built!: bigint;
  public property_type!: string;
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
    brokered_by: {
      type: DataTypes.TEXT,
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
    property_type: {
      type: DataTypes.TEXT,
      allowNull: true,
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

export default House;
