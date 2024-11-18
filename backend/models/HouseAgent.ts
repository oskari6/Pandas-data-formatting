import { DataTypes, Model } from "sequelize";
import sequelize from "../config/mysql_config";

class HouseAgent extends Model {
  public agent_id!: number;
  public name?: string;
  public contact_info?: string;
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
      allowNull: true,
    },
    contact_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    agency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "house_agents",
    timestamps: false, // Disable Sequelize's automatic timestamp columns if unnecessary
  }
);

export default HouseAgent;
