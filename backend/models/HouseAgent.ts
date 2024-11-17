import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";
import House from "./House";

class HouseAgent extends Model {
  public agent_id!: number;
  public name!: string;
  public contact_info!: string;
  public agency!: string;
}

HouseAgent.init(
  {
    agent_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    agency: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "house_agents",
    timestamps: false, // Disable Sequelize's automatic timestamp columns if unnecessary
  }
);

HouseAgent.hasMany(House, { foreignKey: "agent_id", as: "photos" });

export default HouseAgent;
