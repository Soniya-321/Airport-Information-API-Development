import { DataSource } from "typeorm";
import { Airport } from "./entities/Airport"; // Import all your entities
import { City } from "./entities/City";
import { Country } from "./entities/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Airport, City, Country],
});