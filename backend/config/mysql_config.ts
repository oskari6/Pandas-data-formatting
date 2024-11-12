import mysql from "mysql2";

//without sequelize
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "oskari",
//   password: "password",
//   database: "cms_db",
// });

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cms_db", "oskari", "password", {
  host: "localhost",
  dialect: "mysql",
  //logging: false // for terminal logs disable
});

//Table sync
async function syncModels() {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

//MySQL connection
export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();

    if (process.env.NODE_ENV === "development") {
      await syncModels();
    }
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
}

export default sequelize;
