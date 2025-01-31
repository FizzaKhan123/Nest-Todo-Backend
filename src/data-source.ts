import { DataSource } from "typeorm";
// import { databaseConfig } from "./database/database.config";  // Import shared config
import { join } from "path";

// export const AppDataSource = new DataSource({
//   ...databaseConfig,  
// //   entities: [join(__dirname, "database", "entities", "**", "*.entity.{ts,js}")], 
// //   migrations: [join(__dirname, "database", "migrations", "*.ts")], 
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, "database", "entities", "**", "*.entity.{ts,js}")],
  migrations:[],
  // migrations: [join(__dirname, "..", "migrations", "*.ts")],
  synchronize: false,
})