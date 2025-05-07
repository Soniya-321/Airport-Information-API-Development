import fs from "fs";
import csv from "csv-parser";
import { AppDataSource } from "../data-source";
import { Airport } from "../entities/Airport";
import { City } from "../entities/City";

AppDataSource.initialize()
  .then(async () => {
    fs.createReadStream("./data/airport.csv")
      .pipe(csv())
      .on("data", async (row) => {
        try {
          const cityId = parseInt(row.city_id);
          const city = await AppDataSource.manager.findOneBy(City, { id: cityId });

          if (!city) {
            console.warn(`⚠️ Skipping airport "${row.name}": City with id ${cityId} not found.`);
            return;
          }

          const airport = new Airport();
          airport.icao_code = row.icao_code?.trim();
          airport.iata_code = row.iata_code?.trim();
          airport.name = row.name?.trim();
          airport.type = row.type?.trim();
          airport.latitude_deg = parseFloat(row.latitude_deg);
          airport.longitude_deg = parseFloat(row.longitude_deg);
          airport.elevation_ft = parseInt(row.elevation_ft);
          airport.city = city;

          await AppDataSource.manager.save(airport);
          console.log(`✅ Imported airport: ${airport.name}`);
        } catch (err) {
          console.error("❌ Error importing airport row:", row, err);
        }
      })
      .on("end", () => {
        console.log("🎉 Finished importing all airport data.");
      });
  })
  .catch((error) => console.error("❌ DB Init Error:", error));
